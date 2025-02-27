import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./clientApp";
import { AddIssuePayload, DeleteIssuePayload, EditIssuePayload, EditIssueSchema } from "../types/issues.types";

/**
 * Retrieves all issues from the Firestore database.
 *
 * @returns A promise that resolves to an array of {@link EditIssuePayload} objects, or rejects with an error if there was a problem fetching the issues.
 */
export async function getIssues(): Promise<EditIssuePayload[]> {
    try {
        const issuesSnapshot = await getDocs(collection(db, "issues"));
        const documentIssues = issuesSnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        });

        console.log(documentIssues);

        // Convert DocumentData[] to EditIssuePayload[]
        const issues: EditIssuePayload[] = documentIssues
            .map((issue) => {
                const parsed = EditIssueSchema.safeParse(issue);
                return parsed.success ? parsed.data : null;
            })
            .filter((issue): issue is EditIssuePayload => issue !== null);

        return issues;
    } catch (error) {
        console.error("There was an error retrieving the issues: ", error);
        throw error;
    }
}

/**
 * Retrieves all issues from the "issues" collection in the Firestore where "year" == year.
 *
 * @param year - The year of issue/s.
 * 
 * @throws If there is an error when retrieving the issues from Firestore.
 * 
 * @returns An array of all issues in the Firestore in that year.
 */
export async function getIssuesByYear(year: number): Promise<EditIssuePayload[]> {
    try {
        console.log(db);
        const q = query(
            collection(db, "issues"),
            where("publicationYear", "==",year)
        );

        const issuesSnapshot = await getDocs(q);
        const documentIssues = issuesSnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        });

        const issues: EditIssuePayload[] = documentIssues
            .map((issue) => {
                const parsed = EditIssueSchema.safeParse(issue);
                return parsed.success ? parsed.data : null;
            })
            .filter((issue): issue is EditIssuePayload => issue !== null);

        return issues;
    }
    catch(error) {
        console.error("There was an error retrieving the issues: ", error);
        throw error;
    }
}

/**
 * Adds a new issue to the "issues" collection in Firestore.
 *
 * @param issue - The issue data to be added.
 * 
 * @throws If there is an error when adding the issue to Firestore.
 * 
 * @returns A promise that resolves to the document ID of the newly created issue.
 */
export async function addIssue(issue: AddIssuePayload): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, "issues"), issue);

        return docRef.id;
    }
    catch(error) {
        console.error("There was an error adding the issue: ", error);
        throw error;
    }
}

/**
 * Updates an existing issue in the "issues" collection in Firestore.
 *
 * @param issue - The updated issue data, including the document ID.
 * 
 * @throws If there is an error when updating the issue in Firestore.
 * 
 * @returns A promise that resolves to true when the update is successful, and false if otherwise.
 */
export async function editIssue(issue: EditIssuePayload): Promise<boolean> {
    try {
        await updateDoc(doc(db, "issues", issue.id), issue);
        return true;
    }
    catch(error) {
        console.error("There was an error updating the issue: ", error);
        return false;
    }
}

/**
 * Deletes an issue from the "issues" collection in Firestore.
 *
 * @param issue - The issue data containing the document ID to be deleted.
 * 
 * @throws If there is an error when deleting the issue from Firestore.
 * 
 * @returns A promise that resolves to true when the deletion is successful, and false if otherwise.
 */
export async function deleteIssue(issue: DeleteIssuePayload): Promise<boolean> {
    try {
        await deleteDoc(doc(db, "issues", issue.id));
        return true;
    }
    catch(error) {
        console.error("There was an error updating the issue: ", error);
        return false;
    }
}