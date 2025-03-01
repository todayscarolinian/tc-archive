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
import { FileText, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import IssueDialog from "@/components/issue-dialog";
import { EditIssuePayload } from "@/lib/types/issues.types";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import {
  IssueTableColumnType,
  IssueTableProps,
} from "../_types/issue-table.types";
import { editIssue as updateFirestoreIssue, deleteIssue as deleteFirestoreIssue } from "@/lib/firebase/firestore";

const IssueTable = ({ issues: initialIssues, yearFolder }: IssueTableProps) => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged((user) => {
    setUser(user);
  });

  const columnHelper = createColumnHelper<IssueTableColumnType>();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "title", desc: false },
  ]);

  const [issues, setIssues] = useState<EditIssuePayload[]>(initialIssues);

  const handleEditIssue = async (data: EditIssuePayload) => {
    try {
      const success = await updateFirestoreIssue(data);
      
      if (success) {
        setIssues(prevIssues => 
          prevIssues.map(issue => issue.id === data.id ? data : issue)
        );
        
        console.log("Issue updated successfully");
      } else {
        console.log("Failed to update issue");
      }
    } catch (error) {
      console.error(error);
      console.log("Failed to update issue");
    }
  };

  const handleDeleteIssue = async (id: string) => {
    try {
      const success = await deleteFirestoreIssue({ id });
      
      if (success) {
        setIssues(prevIssues => 
          prevIssues.filter(issue => issue.id !== id)
        );
        
        console.log("Issue deleted successfully");
      } else {
        console.log("Failed to delete issue");
      }
    } catch (error) {
      console.error(error);
      console.log("Failed to delete issue");
    }
  };

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
    ...(true // user // <-- Uncomment and remove true to enable isAdmin conditional rendering
      ? [
          columnHelper.accessor("isAdmin", {
            cell: (info) => (
              <IssueDialog
                mode="edit"
                defaultValues={info.row.original}
                onSubmit={handleEditIssue}
                onDelete={handleDeleteIssue}
              />
            ),
            header: "Action",
            enableSorting: false,
          }),
        ]
      : []),
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
