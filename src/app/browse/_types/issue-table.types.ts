export interface IssueTableProps {
  yearFolder: number;
}

// Types for the issue table columns
export type IssueTableColumnType = {
  title: string
  publisher: string
  publicationYear: number
  volume: number
  issueNumber: number
  category: string
  thumbnailLink?: string
  pdfFileLink?: string
  lastModified: string
  isAdmin?: boolean
}