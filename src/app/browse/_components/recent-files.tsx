import { Dot, FileText } from "lucide-react";
import { mockData } from "@/constants/browse-mock-data";

const Recents = () => {
  const recentIssues = mockData.flatMap((folder) => folder.issues);

  return (
    <section className="space-y-6">
      <h1 className="text-lg font-bold">Recent</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recentIssues.map((issue, idx) => (
          <div
            key={`${issue.title}-${issue.lastModified}-${idx}`}
            className="flex items-center gap-4 border p-4 rounded-xl hover:bg-gray-100/50 cursor-pointer"
          >
            <div className="p-3.5 rounded-xl border bg-gray-100/50">
              <FileText />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">{issue.title}</h2>
              <div className="text-sm text-muted-foreground flex items-center">
                <p>{issue.publisher}</p>
                <Dot className="mx-1 w-4 h-4" />
                <p>{issue.category}</p>
              </div>
              <p className="text-xs text-gray-400">{issue.lastModified}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recents;
