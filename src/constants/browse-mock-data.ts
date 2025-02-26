export type IssueType = {
  title: string
  publisher: string
  volume: number
  category: string
  lastModified: string // Temporary for now
  isAdmin: boolean
}

type FolderType = {
  year: number
  lastModified: string
  issues: IssueType[]
}

export const mockData: FolderType[] = [
  {
    year: 1960,
    lastModified: "2023-03-31 12:09:14",
    issues: [
      {
        title: "The Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        category: "Magazine",
        lastModified: "2023-03-31 12:09:14",
        isAdmin: true
      },
      {
        title: "A Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        category: "Magazine",
        lastModified: "2023-03-31 12:09:14",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        category: "Magazine",
        lastModified: "2023-03-31 12:09:14",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        category: "Magazine",
        lastModified: "2023-03-31 12:09:14",
        isAdmin: true
      },
      {
        title: "A test Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        category: "Magazine",
        lastModified: "2023-03-31 12:09:14",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        category: "Magazine",
        lastModified: "2023-03-31 12:09:14",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        category: "Magazine",
        lastModified: "2023-03-31 12:09:14",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "A Carolinian",
        volume: 29,
        category: "Magazine",
        lastModified: "2023-03-31 12:09:14",
        isAdmin: true
      },
    ]
  }
]