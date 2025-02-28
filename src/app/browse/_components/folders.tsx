"use client";
import { Dot, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation"
import useGroupedIssues from "@/hooks/useGroupedIssuesByYear";
import IssueDialog from "@/components/issue-dialog";
import { AddIssuePayload, EditIssuePayload } from "@/lib/types/issues.types";
import { useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "@/lib/firebase/auth";

const Folders = ({ issues }: { issues: EditIssuePayload[] }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Group issues by publication year
  const yearFolders = useGroupedIssues(issues);

  onAuthStateChanged((user) => {
    setUser(user);
  });
    
  // Simulated add issue function
  const handleAddIssue = async (data: AddIssuePayload) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);

      // Add new issue to state with a mock ID
      //   setIssues((prev) => [...prev, { ...data, id: String(prev.length + 1) }]);

      console.log("Issue added successfully");
    } catch (error) {
      console.error(error);
      console.log("Failed to add issue");
    }
  };

  return (
    <section className="space-y-6.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen />
          <h1 className="text-lg font-bold">Folders</h1>
        </div>
        {user && <IssueDialog mode="add" onSubmit={handleAddIssue} />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Simulate: only display year with existing issues */}
        {yearFolders.map((folder, idx) => (
          <div
            key={idx}
            onClick={() => router.push(`/browse/${folder.year}`)}
            className="flex flex-col p-6 gap-4 rounded-xl bg-gray-200/50 hover:shadow cursor-pointer hover:bg-gray-200 transition-transform duration-200 ease-in-out"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 45C7.7625 45 6.7035 44.5597 5.823 43.6792C4.9425 42.7988 4.5015 41.739 4.5 40.5V13.5C4.5 12.2625 4.941 11.2035 5.823 10.323C6.705 9.4425 7.764 9.0015 9 9H22.5L27 13.5H45C46.2375 13.5 47.2972 13.941 48.1792 14.823C49.0612 15.705 49.5015 16.764 49.5 18V40.5C49.5 41.7375 49.0597 42.7972 48.1792 43.6792C47.2988 44.5612 46.239 45.0015 45 45H9Z"
                fill="#EF4444"
              />
            </svg>

            <div>
              <h2 className="font-bold text-md sm:text-lg">{folder.year}</h2>
              <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                <span>{folder.issuesCount} issues</span>
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
