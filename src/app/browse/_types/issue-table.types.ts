import { EditIssuePayload } from "@/lib/types/issues.types";

export interface IssueTableProps {
    data: EditIssuePayload[],
    yearFolder: number;
}

// Types for the issue table columns
export type IssueTableColumnType = {
    id: string
    title: string
    publisher: string
    publicationYear: number
    volume: number
    issueNumber: number
    category: "Magazine"
    | "Newsletter"
    | "Photobook"
    | "Miscellaneous",
    thumbnailLink: string
    pdfLink: string
    lastModified: string
    isAdmin?: boolean,
    createdBy: string
}