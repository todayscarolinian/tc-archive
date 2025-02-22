export type IssueType = {
  title: string
  publisher: string
  volume: number
  issueNumber: number
  category: string
  // thumbnail: "" 
  // pdfFile: "" 
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
        title: "The Carolinian -",
        publisher: "The Carolinian",
        volume: 29,
        issueNumber: 1,
        category: "Magazine",
        lastModified: "2023-01-15 09:23:44",
        isAdmin: true
      },
      {
        title: "The Carolinian -", 
        publisher: "The Carolinian",
        volume: 29,
        issueNumber: 2,
        category: "Magazine",
        lastModified: "2023-02-03 14:32:01",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        issueNumber: 3,
        category: "Magazine",
        lastModified: "2023-02-28 11:15:33",
        isAdmin: true
      },
      {
        title: "The Carolinian -",
        publisher: "The Carolinian",
        volume: 29,
        issueNumber: 4,
        category: "Magazine",
        lastModified: "2023-03-12 16:45:22",
        isAdmin: true
      },
      {
        title: "A test Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        issueNumber: 5,
        category: "Magazine",
        lastModified: "2023-04-05 10:11:55",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        issueNumber: 6,
        category: "Magazine",
        lastModified: "2023-05-18 13:27:09",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "The Carolinian",
        volume: 29,
        issueNumber: 7,
        category: "Magazine",
        lastModified: "2023-06-22 15:41:30",
        isAdmin: true
      },
      {
        title: "The Carolinian",
        publisher: "A Carolinian",
        volume: 29,
        issueNumber: 8,
        category: "Magazine",
        lastModified: "2023-07-01 08:55:17",
        isAdmin: true
      },
    ]
  },
  {
    year: 1962,
    lastModified: "",
    issues: []
  },
  {
    year: 1963,
    lastModified: "",
    issues: []
  },
  {
    year: 1964,
    lastModified: "",
    issues: []
  },
  {
    year: 1965,
    lastModified: "2023-04-15 11:30:00",
    issues: [
      {
        title: "The Carolinian Vol 34",
        publisher: "The Carolinian",
        volume: 34,
        issueNumber: 1,
        category: "Magazine",
        lastModified: "2023-04-15 11:30:00",
        isAdmin: true
      }
    ]
  },
  {
    year: 1970,
    lastModified: "2023-03-31 12:09:14",
    issues: [
      {
        title: "The Carolinian Vol 39",
        publisher: "The Carolinian",
        volume: 39,
        issueNumber: 1,
        category: "Magazine",
        lastModified: "2023-05-20 09:12:44",
        isAdmin: true
      },
      {
        title: "The Carolinian Vol 39",
        publisher: "The Carolinian",
        volume: 39,
        issueNumber: 2,
        category: "Magazine",
        lastModified: "2023-06-15 14:25:33",
        isAdmin: true
      }
    ]
  },
  {
    year: 1972,
    lastModified: "",
    issues: []
  },
  {
    year: 1973,
    lastModified: "",
    issues: []
  },
  {
    year: 1975,
    lastModified: "2023-05-10 15:45:22",
    issues: [
      {
        title: "The Carolinian Vol 44",
        publisher: "The Carolinian",
        volume: 44,
        issueNumber: 1,
        category: "Magazine",
        lastModified: "2023-05-10 15:45:22",
        isAdmin: true
      }
    ]
  },
  {
    year: 1980,
    lastModified: "2023-03-31 12:09:14",
    issues: [
      {
        title: "The Carolinian Vol 49",
        publisher: "The Carolinian",
        volume: 49,
        issueNumber: 1,
        category: "Magazine",
        lastModified: "2023-07-08 16:33:21",
        isAdmin: true
      }
    ]
  },
  {
    year: 1982,
    lastModified: "",
    issues: []
  },
  {
    year: 1985,
    lastModified: "2023-06-20 13:15:44",
    issues: [
      {
        title: "The Carolinian Vol 54",
        publisher: "The Carolinian",
        volume: 54,
        issueNumber: 1,
        category: "Magazine",
        lastModified: "2023-06-20 13:15:44",
        isAdmin: true
      }
    ]
  },
  {
    year: 1987,
    lastModified: "",
    issues: []
  },
  {
    year: 1990,
    lastModified: "2023-03-31 12:09:14",
    issues: [
      {
        title: "The Carolinian Vol 59",
        publisher: "The Carolinian",
        volume: 59,
        issueNumber: 1,
        category: "Magazine",
        lastModified: "2023-08-01 10:20:15",
        isAdmin: true
      }
    ]
  },
  {
    year: 1991,
    lastModified: "",
    issues: []
  }
]