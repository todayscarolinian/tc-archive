"use client";
import IssueDialog from "@/components/issue-dialog";
import { AddIssuePayload, EditIssuePayload } from "@/lib/types/issues.types";
import { use, useEffect, useState } from "react";
import IssueTable from "../_components/issue-table";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import IssueTableSkeleton from "../_components/issue-table-skeleton";
import { getIssuesByYear,  addIssue } from "@/lib/firebase/firestore";

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

  const handleAddIssue = async (data: AddIssuePayload) => {
    try {
      console.log("Form data:", data);
      setIsLoading(true);
      
      const newIssueId = await addIssue(data);
      
      setIssues(prev => [...prev, { ...data, id: newIssueId }]);
      
      console.log("Issue added successfully with ID:", newIssueId);
    } catch (error) {
      console.error("Failed to add issue:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h1 className="font-bold text-2xl">Index of /browse/{year}</h1>
        <div className="flex items-center justify-between">
          <h1 className="text-lg">All Files</h1>
          {
          // user && <--- temporarily disable auth conditional rendering for dev purposes
          (
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
          <IssueTableSkeleton issues={issues} yearFolder={Number(year)} />
        ) : (
          <IssueTable issues={issues} yearFolder={Number(year)} />
        )}
      </div>
    </div>
  );
}
