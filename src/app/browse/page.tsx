"use client";
import { useState, useEffect } from "react";
import Recents from "./_components/recent-files";
import Folders from "./_components/folders";
import RecentFilesSkeleton from "./_components/recent-files-skeleton";
import FolderSkeleton from "./_components/folders-skeleton";
import { EditIssuePayload } from "@/lib/types/issues.types";
import { getIssues } from "@/lib/firebase/firestore";

const BrowsePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [issues, setIssues] = useState<EditIssuePayload[]>([]);

  // Simulate data loading
  useEffect(() => {
    async function fetchIssues() {
      await getIssues()
        .then((issues) => {
          setIssues(issues);
        })
        .catch((error) => {
          console.error("There was an error retrieving the issues: ", error);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    fetchIssues();
  }, []);

  return (
    <>
      <div className="space-y-12">
        {isLoading ? (
          <>
            <RecentFilesSkeleton issues={issues} />
            <FolderSkeleton issues={issues} />
          </>
        ) : (
          <>
            <Recents issues={issues} />
            <Folders issues={issues} />
          </>
        )}
      </div>
    </>
  );
};

export default BrowsePage;
