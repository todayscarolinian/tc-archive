import { EditIssuePayload } from "@/lib/types/issues.types";
import { useMemo } from "react";

const useRecentIssues = (mockData: EditIssuePayload[], limit: number = 4) => {
    return useMemo(() => {
        return [...mockData]
            .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
            .slice(0, limit);
    }, [mockData, limit]);
};

export default useRecentIssues;
