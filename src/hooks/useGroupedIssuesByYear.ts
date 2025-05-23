import { EditIssuePayload } from "@/lib/types/issues.types";
import { useMemo } from "react";

interface YearFolder {
    year: number;
    lastModified: string;
    issuesCount: number;
}

const useGroupedIssues = (mockData: EditIssuePayload[]): YearFolder[] => {
    return useMemo(() => {
        const issuesByYear = mockData.reduce((acc, issue) => {
            const year = issue.publicationYear;
            if (!acc[year]) acc[year] = [];
            acc[year].push(issue);
            return acc;
        }, {} as Record<number, EditIssuePayload[]>);

        return Object.entries(issuesByYear)
            .map(([year, issues]) => ({
                year: parseInt(year),
                lastModified: issues.length
                    ? issues.reduce((latest, issue) =>
                        new Date(issue.lastModified) > new Date(latest) ? issue.lastModified : latest
                        , issues[0].lastModified)
                    : "",
                issuesCount: issues.length,
            }))
            .sort((a, b) => a.year - b.year);
    }, [mockData]);
};

export default useGroupedIssues;
