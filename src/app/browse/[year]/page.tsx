"use client";
import IssueDialog from "@/components/issue-dialog";
import { AddIssuePayload, EditIssuePayload } from "@/lib/types/issues.types";
import { use, useState } from "react";
import IssueTable from "../_components/issue-table";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import IssueTableSkeleton from "../_components/issue-table-skeleton";
import { getIssues } from "@/lib/firebase/firestore";

interface PageProps {
  params: Promise<{ year: string }>;
}
export default function BrowsePage({ params }: PageProps) {
  const { year } = use(params) as { year: string };
  const [issues, setIssues] = useState<EditIssuePayload[]>([]);
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged((user) => {
    setUser(user);
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data loading
  useState(() => {
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
  });

  // // Simulated add issue function
  const handleAddIssue = async (data: AddIssuePayload) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);

      // Add new issue to state with a mock ID
      //   setIssues((prev) => [...prev, { ...data, id: `${prev.length + 1}` }]);

      console.log("Issue added successfully");
    } catch (error) {
      console.error(error);
      console.log("Failed to add issue");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h1 className="font-bold text-2xl">Index of /browse/{year}</h1>
        <div className="flex items-center justify-between">
          <h1 className="text-lg">All Files</h1>
          {user && (
            <IssueDialog
              mode="add"
              onSubmit={handleAddIssue}
              yearFromRoute={year}
            />
          )}
        </div>
      </div>
      <div>
        {isLoading ? (
          <IssueTableSkeleton data={issues} yearFolder={Number(year)} />
        ) : (
          <IssueTable data={issues} yearFolder={Number(year)} />
        )}
      </div>
    </div>
  );
}
