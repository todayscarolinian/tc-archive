import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IssueType, mockData } from "@/constants/browse-mock-data";
import { FileText, PenSquare } from "lucide-react";

const IssueTable = () => {
  const columnHelper = createColumnHelper<IssueType>();

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
    }),
    columnHelper.accessor("publisher", {
      cell: (info) => info.getValue(),
      header: "Publisher",
    }),
    columnHelper.accessor("volume", {
      cell: (info) => info.getValue(),
      header: "Volume",
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      header: "Category",
    }),
    columnHelper.accessor("lastModified", {
      cell: (info) => info.getValue(),
      header: "Last Modified",
    }),
    columnHelper.accessor("isAdmin", {
      cell: () => (
        <div>
          <button className="p-2 bg-red-800 text-white rounded-md">
            <PenSquare size={20} />
          </button>
        </div>
      ),
      header: "Action",
    }),
  ];

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto border border-gray-200 rounded-lg">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50 border">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="w-full">
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={`px-6 py-3 text-left text-sm font-medium text-gray-500 ${index === 0 ? 'w-2xl max-w-2xl truncate whitespace-nowrap' : ''
                    }`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <span className="text-gray-400">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 10L12 15L17 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50 w-full">
              {row.getVisibleCells().map((cell, index) => (
                <TableCell
                  key={cell.id}
                  className={`px-6 py-3 text-left text-sm font-medium text-gray-500 ${index === 0 ? 'w-2xl max-w-2xl truncate whitespace-nowrap' : ''
                    }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  );
};

export default IssueTable;
