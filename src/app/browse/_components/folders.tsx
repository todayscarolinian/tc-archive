"use client"
import { Button } from "@/components/ui/button";
import { Plus, Dot, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";

const mockData = [
  { year: "1964", numOfIssues: "6 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1965", numOfIssues: "4 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1966", numOfIssues: "3 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1967", numOfIssues: "7 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1968", numOfIssues: "5 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1969", numOfIssues: "2 issues", lastModified: "2023-03-31 12:09:14" },
];

const Folders = () => {
  const router = useRouter()
  return (
    <section className="space-y-6.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen />
          <h1 className="text-lg font-bold">Folders</h1>
        </div>
        <Button className="bg-[#9B2626]">
            <Plus />
            Add Issues
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockData.map((folder, idx) => (
          <div key={idx} onClick={() => router.push(`/browse/${folder.year}`)} className="flex flex-col p-6 gap-4 rounded-xl bg-gray-200/50 hover:shadow cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
            <svg width="48" height="48" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 45C7.7625 45 6.7035 44.5597 5.823 43.6792C4.9425 42.7988 4.5015 41.739 4.5 40.5V13.5C4.5 12.2625 4.941 11.2035 5.823 10.323C6.705 9.4425 7.764 9.0015 9 9H22.5L27 13.5H45C46.2375 13.5 47.2972 13.941 48.1792 14.823C49.0612 15.705 49.5015 16.764 49.5 18V40.5C49.5 41.7375 49.0597 42.7972 48.1792 43.6792C47.2988 44.5612 46.239 45.0015 45 45H9Z" fill="#EF4444" />
            </svg>

            <div>
              <h2 className="font-bold text-md sm:text-lg">{folder.year}</h2>
              <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                <span>{folder.numOfIssues}</span>
                <Dot className="mx-1 w-4 h-4" />
                <span>{folder.lastModified}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Folders;
