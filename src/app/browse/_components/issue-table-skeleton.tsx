"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockData } from "@/constants/browse-mock-data";
import { useMemo } from "react";
import { IssueTableProps } from "../_types/issue-table.types";

const IssueTableSkeleton = ({ yearFolder }: IssueTableProps) => {
  const issues = useMemo(() => {
    const folder = mockData.find((folder) => folder.year == yearFolder);

    if (!folder) {
      console.warn(`No folder found for year ${yearFolder}`);
      return [];
    }

    return folder.issues || [];
  }, [yearFolder]);
  const skeletonColumns = Array.from({ length: 6 }); // Constant 6 columns (Name, Publisher, Volume, Category, Last Modified, Action)

  return (
    <div className="overflow-auto border border-gray-200 rounded-lg">
      <div className="p-2 bg-gray-50 text-sm text-gray-500">
        <Skeleton className="h-4 w-64" />
      </div>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50 border">
          <TableRow className="w-full">
            {skeletonColumns.map((_, index) => (
              <TableHead
                key={index}
                className={`px-6 py-3 text-left text-sm font-medium text-gray-500 ${
                  index === 0 ? "w-2xl max-w-2xl" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {issues.map((_, rowIndex) => (
            <TableRow key={rowIndex} className="w-full">
              {skeletonColumns.map((_, colIndex) => (
                <TableCell
                  key={`${rowIndex}-${colIndex}`}
                  className={`px-6 py-3 text-left text-sm font-medium text-gray-500 ${
                    colIndex === 0 ? "w-2xl max-w-2xl" : ""
                  }`}
                >
                  {colIndex === 0 ? (
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-xl" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) : colIndex === 5 ? (
                    <Skeleton className="h-9 w-9 rounded-md" />
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssueTableSkeleton;
