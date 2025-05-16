import { Skeleton } from "@/components/ui/skeleton";
import useRecentIssues from "@/hooks/useRecentIssues";
import { EditIssuePayload } from "@/lib/types/issues.types";
import { Dot } from "lucide-react";

const RecentFilesSkeleton = ({ issues }: { issues: EditIssuePayload[] }) => {
  const recentIssues = useRecentIssues(issues);

  return (
    <section className="space-y-6">
      <Skeleton className="h-5 w-24" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recentIssues.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 border p-4 rounded-xl hover:bg-gray-100/50 cursor-pointer"
          >
            <Skeleton className="p-3.5 rounded-xl border bg-gray-100/50 h-14 w-14" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-36" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-24" />
                <Dot className="mx-1 w-4 h-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentFilesSkeleton;
