import { Skeleton } from "@/components/ui/skeleton";
import { mockData } from "@/constants/browse-mock-data";
import useGroupedIssues from "@/hooks/useGroupedIssuesByYear";
import { Dot } from "lucide-react";

const FolderSkeleton = () => {
  // Group issues by publication year (logic for this could be done in API routes)
  const yearFolders = useGroupedIssues(mockData);

  return (
    <section className="space-y-6.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-8" />
          <Skeleton className="h-5 w-18" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {yearFolders.map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col p-6 gap-4 rounded-xl bg-gray-200/50 hover:shadow cursor-pointer hover:bg-gray-200 transition-transform duration-200 ease-in-out"
          >
            <Skeleton className="h-11 w-12" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-14" />
              <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                <Skeleton className="h-4 w-18" />
                <Dot className="mx-1 w-4 h-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FolderSkeleton;
