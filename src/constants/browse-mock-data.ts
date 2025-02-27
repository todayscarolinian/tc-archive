export type IssueType = {
  id: number
  title: string
  publisher: string
  publicationYear: number
  volume: number
  issueNumber: number
  category: "Magazine" | "Newsletter" | "Photobook" | "Miscellaneous"
  thumbnailLink: string
  pdfLink: string
  lastModified: string // Temporary for displaying purposes only
}

export const mockData: IssueType[] = [
  {
    id: 1,
    title: "The Carolinian -",
    publisher: "The Carolinian",
    publicationYear: 1960,
    volume: 29,
    issueNumber: 1,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-01-15 09:23:44"
  },
  {
    id: 2,
    title: "The Carolinian -", 
    publisher: "The Carolinian",
    publicationYear: 1960,
    volume: 29,
    issueNumber: 2,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-02-03 14:32:01"
  },
  {
    id: 3,
    title: "The Carolinian",
    publisher: "The Carolinian",
    publicationYear: 1960,
    volume: 29,
    issueNumber: 3,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-02-28 11:15:33"
  },
  {
    id: 4,
    title: "The Carolinian -",
    publisher: "The Carolinian",
    publicationYear: 1960,
    volume: 29,
    issueNumber: 4,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-03-12 16:45:22"
  },
  {
    id: 5,
    title: "A test Carolinian",
    publisher: "The Carolinian",
    publicationYear: 1960,
    volume: 29,
    issueNumber: 5,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-04-05 10:11:55"
  },
  {
    id: 6,
    title: "The Carolinian",
    publisher: "The Carolinian",
    publicationYear: 1960,
    volume: 29,
    issueNumber: 6,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-05-18 13:27:09"
  },
  {
    id: 7,
    title: "The Carolinian",
    publisher: "The Carolinian",
    publicationYear: 1960,
    volume: 29,
    issueNumber: 7,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-06-22 15:41:30"
  },
  {
    id: 8,
    title: "The Carolinian",
    publisher: "A Carolinian",
    publicationYear: 1960,
    volume: 29,
    issueNumber: 8,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-07-01 08:55:17"
  },
  {
    id: 9,
    title: "The Carolinian Vol 34",
    publisher: "The Carolinian",
    publicationYear: 1965,
    volume: 34,
    issueNumber: 1,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-04-15 11:30:00"
  },
  {
    id: 10,
    title: "The Carolinian Vol 39",
    publisher: "The Carolinian",
    publicationYear: 1970,
    volume: 39,
    issueNumber: 1,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-05-20 09:12:44"
  },
  {
    id: 11,
    title: "The Carolinian Vol 39",
    publisher: "The Carolinian",
    publicationYear: 1970,
    volume: 39,
    issueNumber: 2,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-06-15 14:25:33"
  },
  {
    id: 12,
    title: "The Carolinian Vol 44",
    publisher: "The Carolinian",
    publicationYear: 1975,
    volume: 44,
    issueNumber: 1,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-05-10 15:45:22"
  },
  {
    id: 13,
    title: "The Carolinian Vol 49",
    publisher: "The Carolinian",
    publicationYear: 1980,
    volume: 49,
    issueNumber: 1,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-07-08 16:33:21"
  },
  {
    id: 14,
    title: "The Carolinian Vol 54",
    publisher: "The Carolinian",
    publicationYear: 1985,
    volume: 54,
    issueNumber: 1,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-06-20 13:15:44"
  },
  {
    id: 15,
    title: "The Carolinian Vol 59",
    publisher: "The Carolinian",
    publicationYear: 1990,
    volume: 59,
    issueNumber: 1,
    category: "Magazine",
    thumbnailLink: "",
    pdfLink: "",
    lastModified: "2023-08-01 10:20:15"
  }
]