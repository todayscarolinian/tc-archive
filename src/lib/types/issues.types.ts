import { z } from "zod";

export const AddIssueSchema = z.object({
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
        })
        .min(3, "title must have a minimum of 3 characters")
        .max(255, "title cannot exceed 255 characters"),
    publisher: z
        .string({
            required_error: "publisher is required",
            invalid_type_error: "publisher must be a string",
        })
        .min(3, "publisher cannot be empty")
        .max(255, "publisher cannot exceed 255 characters"),
    publicationYear: z
        .number({
            required_error: "publicationYear is required",
            invalid_type_error: "publicationYear must be a number",
        })
        .min(1900, "publicationYear must be after 1900")
        .max(new Date().getFullYear(), {
            message: "publicationYear must not exceed the current year",
        }),
    volume: z
        .number({
            required_error: "volume is required",
            invalid_type_error: "volume must be a number",
        })
        .min(1, "volume must be at least 1"),
    issueNumber: z
        .number({
            required_error: "issueNumber is required",
            invalid_type_error: "issueNumber must be a number",
        })
        .min(1, "issueNumber must be at least 1"),
    category: z.enum(["Magazine", "Newsletter", "Photobook", "Miscellaneous"], {
        required_error: "category is required",
    }),
    thumbnailLink: z
        .string({
            required_error: "thumbnailLink is required",
            invalid_type_error: "thumbnailLink must be a string",
        })
        .min(1, "thumbnailLink cannot be empty"),
    pdfLink: z
        .string({
            required_error: "pdfLink is required",
            invalid_type_error: "pdfLink must be a string",
        })
        .min(1, "pdfLink cannot be emptpy"),
});

export const EditIssueSchema = z.object({
    id: z.number({
        required_error: "id is required",
        invalid_type_error: "id must be a number",
    }),
    title: z
        .string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
        })
        .min(3, "title must have a minimum of 3 characters")
        .max(255, "title cannot exceed 255 characters"),
    publisher: z
        .string({
            required_error: "publisher is required",
            invalid_type_error: "publisher must be a string",
        })
        .min(3, "publisher cannot be empty")
        .max(255, "publisher cannot exceed 255 characters"),
    publicationYear: z
        .number({
            required_error: "publicationYear is required",
            invalid_type_error: "publicationYear must be a number",
        })
        .min(1900, "publicationYear must be after 1900")
        .max(new Date().getFullYear(), {
            message: "publicationYear must not exceed the current year",
        }),
    volume: z
        .number({
            required_error: "volume is required",
            invalid_type_error: "volume must be a number",
        })
        .min(1, "volume must be at least 1"),
    issueNumber: z
        .number({
            required_error: "issueNumber is required",
            invalid_type_error: "issueNumber must be a number",
        })
        .min(1, "issueNumber must be at least 1"),
    category: z.enum(["Magazine", "Newsletter", "Photobook", "Miscellaneous"], {
        required_error: "category is required",
    }),
    thumbnailLink: z
        .string({
            required_error: "thumbnailLink is required",
            invalid_type_error: "thumbnailLink must be a string",
        })
        .min(1, "thumbnailLink cannot be empty"),
    pdfLink: z
        .string({
            required_error: "pdfLink is required",
            invalid_type_error: "pdfLink must be a string",
        })
        .min(1, "pdfLink cannot be emptpy"),
});

export const DeleteIssueSchema = z.object({
    id: z.number({
        required_error: "id is required",
        invalid_type_error: "id must be a number",
    }),
});

export type AddIssuePayload = z.infer<typeof AddIssueSchema>;
export type EditIssuePayload = z.infer<typeof EditIssueSchema>;
export type DeleteIssuePayload = z.infer<typeof DeleteIssueSchema>;
