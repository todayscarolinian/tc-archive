"use client";
import IssueDialog, { IssueDialogSuccess } from "@/components/issue-dialog";
import { EditIssuePayload } from "@/lib/types/issues.types";
import { use, useEffect, useState } from "react";
import IssueTable from "../_components/issue-table";
import { useHasHeraldDomainAccess } from "@/lib/herald/use-has-domain-access";
import IssueTableSkeleton from "../_components/issue-table-skeleton";
import { getIssuesByYear } from "@/lib/firebase/firestore";

interface PageProps {
  params: Promise<{ year: string }>;
}
export default function BrowsePage({ params }: PageProps) {
  const { year } = use(params) as { year: string };
  const [issues, setIssues] = useState<EditIssuePayload[]>([]);
  const { hasAccess } = useHasHeraldDomainAccess();

  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data loading
  useEffect(() => {
    async function fetchIssues() {
      try {
        const fetchedIssues = await getIssuesByYear(Number(year));
        setIssues(fetchedIssues);
      } catch (error) {
        console.error("There was an error retrieving the issues: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIssues();
  }, [year]);

  const handleAddSuccess = (result: IssueDialogSuccess) => {
    if (result.mode === "add") {
      setIssues((prev) => [...prev, result.issue]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h1 className="font-bold text-2xl">Index of /browse/{year}</h1>
        <div className="flex items-center justify-between">
          <h1 className="text-lg">All Files</h1>
          {hasAccess && (
            <IssueDialog
              mode="add"
              onSuccess={handleAddSuccess}
              yearFromRoute={year}
            />
          )}
        </div>
      </div>
      <div>
        {isLoading ? (
          <IssueTableSkeleton issues={issues} yearFolder={Number(year)} />
        ) : (
          <IssueTable issues={issues} yearFolder={Number(year)} />
        )}
      </div>
    </div>
  );
}
