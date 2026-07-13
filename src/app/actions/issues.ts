"use server";

import { headers } from "next/headers";
import { randomUUID } from "crypto";
import { requireHeraldAccess, isAccessError } from "@/lib/herald/require-access";
import { getAdminDb, getAdminBucket } from "@/lib/firebase/admin";
import type { HeraldUser } from "@/lib/herald/types";
import {
    AddIssueSchema,
    EditIssueSchema,
    type EditIssuePayload,
} from "@/lib/types/issues.types";

type ActionError = {
    success: false;
    error:
        | "UNAUTHENTICATED"
        | "FORBIDDEN"
        | "SERVICE_ERROR"
        | "VALIDATION"
        | "STORAGE_ERROR"
        | "DB_ERROR";
    message: string;
};

type MutateResult = { success: true; issue: EditIssuePayload } | ActionError;
type DeleteResult = { success: true } | ActionError;

async function getAccessOrError(): Promise<{ user: HeraldUser } | { errorResult: ActionError }> {
    const cookieHeader = (await headers()).get("cookie");
    const access = await requireHeraldAccess(cookieHeader);
    if (isAccessError(access)) {
        return { errorResult: { success: false, error: access.error, message: access.message } };
    }
    return { user: access.user };
}

function extractStoragePathFromDownloadUrl(url: string): string | null {
    try {
        const parsed = new URL(url);
        const marker = "/o/";
        const idx = parsed.pathname.indexOf(marker);
        if (idx === -1) return null;
        return decodeURIComponent(parsed.pathname.slice(idx + marker.length));
    } catch {
        return null;
    }
}

async function uploadFile(
    file: File,
    folder: "thumbnails" | "pdfs",
    title: string
): Promise<string> {
    const extension = folder === "pdfs" ? ".pdf" : "";
    const path = `${folder}/${title}-${Date.now()}${extension}`;
    const bucket = getAdminBucket();
    const token = randomUUID();
    const buffer = Buffer.from(await file.arrayBuffer());

    const bucketFile = bucket.file(path);
    await bucketFile.save(buffer, {
        contentType: file.type,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: token,
            },
        },
    });

    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
        path
    )}?alt=media&token=${token}`;
}

async function deleteFileByDownloadUrl(url: string | null | undefined): Promise<void> {
    if (!url) return;
    const path = extractStoragePathFromDownloadUrl(url);
    if (!path) return;
    try {
        await getAdminBucket().file(path).delete({ ignoreNotFound: true });
    } catch (error) {
        console.warn("Could not delete storage object:", error);
    }
}

function parseScalarFields(formData: FormData) {
    return {
        title: formData.get("title")?.toString() ?? "",
        publisher: formData.get("publisher")?.toString() ?? "",
        publicationYear: Number(formData.get("publicationYear")),
        volume: Number(formData.get("volume")),
        issueNumber: Number(formData.get("issueNumber")),
        category: formData.get("category")?.toString() ?? "",
    };
}

export async function addIssueAction(formData: FormData): Promise<MutateResult> {
    const access = await getAccessOrError();
    if ("errorResult" in access) return access.errorResult;

    const thumbnail = formData.get("thumbnail");
    const pdf = formData.get("pdf");
    if (!(thumbnail instanceof File) || !(pdf instanceof File)) {
        return { success: false, error: "VALIDATION", message: "Thumbnail and PDF files are required." };
    }

    const now = new Date().toISOString();
    const parsed = AddIssueSchema.safeParse({
        ...parseScalarFields(formData),
        thumbnailLink: "pending",
        pdfLink: "pending",
        createdBy: access.user.email,
        lastModified: now,
    });
    if (!parsed.success) {
        return {
            success: false,
            error: "VALIDATION",
            message: parsed.error.issues.map((i) => i.message).join(", "),
        };
    }

    let thumbnailLink: string;
    let pdfLink: string;
    try {
        thumbnailLink = await uploadFile(thumbnail, "thumbnails", parsed.data.title);
        pdfLink = await uploadFile(pdf, "pdfs", parsed.data.title);
    } catch (error) {
        return {
            success: false,
            error: "STORAGE_ERROR",
            message: error instanceof Error ? error.message : "Failed to upload files.",
        };
    }

    try {
        const docData = { ...parsed.data, thumbnailLink, pdfLink };
        const docRef = await getAdminDb().collection("issues").add(docData);
        return { success: true, issue: { ...docData, id: docRef.id } };
    } catch (error) {
        return {
            success: false,
            error: "DB_ERROR",
            message: error instanceof Error ? error.message : "Failed to save the issue.",
        };
    }
}

export async function editIssueAction(formData: FormData): Promise<MutateResult> {
    const access = await getAccessOrError();
    if ("errorResult" in access) return access.errorResult;

    const id = formData.get("id")?.toString();
    if (!id) {
        return { success: false, error: "VALIDATION", message: "Issue id is required." };
    }

    const previousThumbnailLink = formData.get("previousThumbnailLink")?.toString() ?? "";
    const previousPdfLink = formData.get("previousPdfLink")?.toString() ?? "";
    const newThumbnail = formData.get("thumbnail");
    const newPdf = formData.get("pdf");
    // Preserve the original creator — never overwrite with whoever is editing.
    const createdBy = formData.get("previousCreatedBy")?.toString() || access.user.email;

    const parsed = EditIssueSchema.safeParse({
        ...parseScalarFields(formData),
        id,
        thumbnailLink: newThumbnail instanceof File ? "pending" : previousThumbnailLink,
        pdfLink: newPdf instanceof File ? "pending" : previousPdfLink,
        createdBy,
        lastModified: new Date().toISOString(),
    });
    if (!parsed.success) {
        return {
            success: false,
            error: "VALIDATION",
            message: parsed.error.issues.map((i) => i.message).join(", "),
        };
    }

    let thumbnailLink = previousThumbnailLink;
    let pdfLink = previousPdfLink;
    try {
        if (newThumbnail instanceof File) {
            thumbnailLink = await uploadFile(newThumbnail, "thumbnails", parsed.data.title);
            await deleteFileByDownloadUrl(previousThumbnailLink);
        }
        if (newPdf instanceof File) {
            pdfLink = await uploadFile(newPdf, "pdfs", parsed.data.title);
            await deleteFileByDownloadUrl(previousPdfLink);
        }
    } catch (error) {
        return {
            success: false,
            error: "STORAGE_ERROR",
            message: error instanceof Error ? error.message : "Failed to upload files.",
        };
    }

    try {
        const docData = { ...parsed.data, thumbnailLink, pdfLink };
        // createdBy is intentionally excluded from the write — it's immutable
        // once set, we only echo the existing value back in the response.
        const updateData: Partial<typeof docData> = { ...docData };
        delete updateData.id;
        delete updateData.createdBy;
        await getAdminDb().collection("issues").doc(docData.id).update(updateData);
        return { success: true, issue: docData };
    } catch (error) {
        return {
            success: false,
            error: "DB_ERROR",
            message: error instanceof Error ? error.message : "Failed to update the issue.",
        };
    }
}

export async function deleteIssueAction(formData: FormData): Promise<DeleteResult> {
    const access = await getAccessOrError();
    if ("errorResult" in access) return access.errorResult;

    const id = formData.get("id")?.toString();
    if (!id) {
        return { success: false, error: "VALIDATION", message: "Issue id is required." };
    }

    const thumbnailLink = formData.get("thumbnailLink")?.toString();
    const pdfLink = formData.get("pdfLink")?.toString();

    await deleteFileByDownloadUrl(thumbnailLink);
    await deleteFileByDownloadUrl(pdfLink);

    try {
        await getAdminDb().collection("issues").doc(id).delete();
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: "DB_ERROR",
            message: error instanceof Error ? error.message : "Failed to delete the issue.",
        };
    }
}
