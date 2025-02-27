export interface IssueTableProps {
    yearFolder: number;
}

// Types for the issue table columns
export type IssueTableColumnType = {
    id: number
    title: string
    publisher: string
    publicationYear: number
    volume: number
    issueNumber: number
    category: 'Magazine' | 'Newsletter' | 'Photobook' | 'Miscellaneous',
    thumbnailLink: string
    pdfLink: string
    lastModified: string
    isAdmin?: boolean
}