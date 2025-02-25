"use client";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IssueType, mockData } from "@/constants/browse-mock-data";
import { FileText, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useMemo } from "react";
import IssueDialog from "@/components/issue-dialog";
import { EditIssuePayload } from "@/lib/types/issues.types";

interface IssueTableProps {
  yearFolder: number;
}

const IssueTable = ({ yearFolder }: IssueTableProps) => {
  const columnHelper = createColumnHelper<IssueType>();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "title", desc: false },
  ]);
  const [editIssue, setEditIssue] = useState<EditIssuePayload[]>([]);

  // Simulated edit issue function
  const handleEditIssue = async (data: EditIssuePayload) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update issue in state
      setEditIssue((prev) =>
        prev.map((issue) => (issue.id === data.id ? data : issue))
      );

      console.log("Issue updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Failed to update issue");
    }
  };

  const issues = useMemo(() => {
    const folder = mockData.find((folder) => folder.year == yearFolder);

    if (!folder) {
      console.warn(`No folder found for year ${yearFolder}`);
      return [];
    }

    return folder.issues || [];
  }, [yearFolder]);

  //   helper to convert IssueType to EditIssuePayload
  const mapIssueToEditIssuePayload = (
    issue: IssueType,
    yearFolder: number
  ): EditIssuePayload => ({
    id: 0,
    title: issue.title,
    publisher: issue.publisher,
    volume: issue.volume,
    category: issue.category as
      | "Magazine"
      | "Newsletter"
      | "Photobook"
      | "Miscellaneous",
    publicationYear: yearFolder,
    issueNumber: 1,
    thumbnailLink: "",
    pdfLink: "",
  });

  const columns = [
    columnHelper.accessor("title", {
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="border p-2 bg-gray-100/50 rounded-xl">
            <FileText />
          </div>
          <span className="font-semibold">{info.getValue()}</span>
        </div>
      ),
      header: "Name",
      enableSorting: true,
    }),
    columnHelper.accessor("publisher", {
      cell: (info) => info.getValue(),
      header: "Publisher",
      enableSorting: true,
    }),
    columnHelper.accessor("volume", {
      cell: (info) => info.getValue(),
      header: "Volume",
      enableSorting: true,
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      header: "Category",
      enableSorting: true,
    }),
    columnHelper.accessor("lastModified", {
      cell: (info) => info.getValue(),
      header: "Last Modified",
      enableSorting: true,
    }),
    columnHelper.accessor("isAdmin", {
      cell: (info) => {
        const editValues = mapIssueToEditIssuePayload(
          info.row.original,
          yearFolder
        );
        return (
          <IssueDialog
            mode="edit"
            defaultValues={editValues}
            onSubmit={handleEditIssue}
          />
        );
      },
      header: "Action",
      enableSorting: false,
    }),
  ];

  const handleSortingChange = (columnId: string) => {
    setSorting((prev) => {
      if (prev.length > 0 && prev[0].id === columnId) {
        return [{ id: columnId, desc: !prev[0].desc }];
      }
      return [{ id: columnId, desc: false }];
    });
  };

  const table = useReactTable({
    data: issues,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-auto border border-gray-200 rounded-lg">
      <div className="p-2 bg-gray-50 text-sm text-gray-500">
        Viewing issues for year: {yearFolder} | Found: {issues.length} issues
      </div>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50 border">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="w-full">
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={`px-6 py-3 text-left text-sm font-medium text-gray-500 ${
                    index === 0
                      ? "w-2xl max-w-2xl truncate whitespace-nowrap"
                      : ""
                  }`}
                  onClick={
                    header.column.getCanSort()
                      ? () => handleSortingChange(header.column.id)
                      : undefined
                  }
                  style={{
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <span className="text-gray-400">
                        {sorting[0]?.id === header.column.id ? (
                          sorting[0]?.desc ? (
                            <ArrowDown size={16} />
                          ) : (
                            <ArrowUp size={16} />
                          )
                        ) : (
                          <ArrowUp size={16} className="opacity-30" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50 w-full">
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={`px-6 py-3 text-left text-sm font-medium text-gray-500 ${
                      index === 0
                        ? "w-2xl max-w-2xl truncate whitespace-nowrap"
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                No issues found for year {yearFolder}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssueTable;
