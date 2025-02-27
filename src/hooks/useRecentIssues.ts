import { useMemo } from "react";
import { IssueType } from "@/constants/browse-mock-data";

const useRecentIssues = (mockData: IssueType[], limit: number = 4) => {
  return useMemo(() => {
    return [...mockData]
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
      .slice(0, limit);
  }, [mockData, limit]);
};

export default useRecentIssues;
