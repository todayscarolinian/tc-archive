"use client";
import { useState, useEffect } from "react";
import Recents from "./_components/recent-files";
import Folders from "./_components/folders";
import RecentFilesSkeleton from "./_components/recent-files-skeleton";
import FolderSkeleton from "./_components/folders-skeleton";

const BrowsePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="space-y-12">
        {isLoading ? (
          <>
            <RecentFilesSkeleton />
            <FolderSkeleton />
          </>
        ) : (
          <>
            <Recents />
            <Folders />
          </>
        )}
      </div>
    </>
  );
};

export default BrowsePage;
