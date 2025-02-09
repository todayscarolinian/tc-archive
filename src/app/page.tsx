"use client";

import IssueDialog from "@/components/add-issue-dialog";
import { AddIssuePayload, EditIssuePayload } from "@/lib/types/issues.types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [issues, setIssues] = useState<EditIssuePayload[]>([]);

    // Simulated add issue function
    const handleAddIssue = async (data: AddIssuePayload) => {
        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Add new issue to state with a mock ID
            setIssues((prev) => [...prev, { ...data, id: prev.length + 1 }]);

            console.log("Issue added successfully");
        } catch (error) {
            console.error(error);
            console.log("Failed to add issue");
        }
    };

    // Simulated edit issue function
    const handleEditIssue = async (data: EditIssuePayload) => {
        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update issue in state
            setIssues((prev) =>
                prev.map((issue) => (issue.id === data.id ? data : issue))
            );

            console.log("Issue updated successfully");
        } catch (error) {
            console.error(error);
            console.log("Failed to update issue");
        }
    };

    return (
        <section className="h-svh flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col items-center gap-10 max-w-sm md:max-w-2xl lg:max-w-4xl">
                <Image
                    src="/tc-banner.png"
                    alt="tc-banner"
                    className="max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
                    width={7369}
                    height={1090}
                />
                <p className="text-xl text-center">
                    Explore historical articles and magazines of Today&apos;s
                    Carolinian from past years.
                </p>
            </div>
            {/* <Link
                href="/browse"
                className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-4 py-2 rounded-md items-center gap-2"
            >
                Browse <ChevronRight />
            </Link> */}

            <div className="flex gap-6">
                <IssueDialog mode="add" onSubmit={handleAddIssue} />
                <IssueDialog mode="edit" onSubmit={handleAddIssue} />
            </div>
        </section>
    );
}
