import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowLink?: (row: TData) => string;
  sorting: SortingState;
  onSortingChange: (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  onPageIndexChange: (
    newPageIndex: number | ((prevIndex: number) => number)
  ) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  getRowLink,
  sorting,
  onSortingChange,
  pageIndex,
  pageSize,
  totalPages,
  onPageIndexChange,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) {
  const defaultSorting: SortingState = [
    {
      id: "timestamp", // Assuming 'timestamp' is the column ID
      desc: true, // Set to true for descending order
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting.length === 0 ? defaultSorting : sorting,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange,
    onPaginationChange: (updaterOrValue) => {
      if (typeof updaterOrValue === "function") {
        const newPagination = updaterOrValue({
          pageIndex,
          pageSize,
        });
        onPageIndexChange(newPagination.pageIndex);
        onPageSizeChange(newPagination.pageSize);
      } else {
        onPageIndexChange(updaterOrValue.pageIndex);
        onPageSizeChange(updaterOrValue.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {isSorted ? (
                        isSorted === "asc" ? (
                          <ChevronUp className="inline-block ml-2" />
                        ) : (
                          <ChevronDown className="inline-block ml-2" />
                        )
                      ) : null}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const rowLink = getRowLink ? getRowLink(row.original) : "#";
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => navigate(rowLink)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-4 p-6">
        <div className="text-sm">
          Page{" "}
          <strong>
            {pageIndex + 1} of {totalPages}
          </strong>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageIndexChange(0)}
            disabled={pageIndex <= 0}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              onPageIndexChange((prevIndex) => Math.max(prevIndex - 1, 0))
            }
            disabled={pageIndex <= 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              onPageIndexChange((prevIndex) =>
                Math.min(prevIndex + 1, totalPages - 1)
              )
            }
            disabled={pageIndex >= totalPages - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageIndexChange(totalPages - 1)}
            disabled={pageIndex >= totalPages - 1}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
