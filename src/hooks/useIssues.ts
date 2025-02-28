
import { EditIssuePayload } from "@/lib/types/issues.types";
import { useMemo } from "react";

const useIssues = (mockData: EditIssuePayload[], yearFolder: number) => {
    return useMemo(() => {
        const filteredIssues = mockData?.filter(
            (issue) => issue.publicationYear === yearFolder
        ) || [];

        if (filteredIssues.length === 0) {
            console.warn(`No issues found for year ${yearFolder}`);
        }

        return filteredIssues;
    }, [mockData, yearFolder]);
};

export default useIssues;
