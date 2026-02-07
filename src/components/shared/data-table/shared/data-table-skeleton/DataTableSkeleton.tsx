// Core
import { Skeleton } from "@/components/ui/skeleton";

// App
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";

interface Props {
  columns: number;
  rows?: number;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
}

const DataTableSkeleton: FC<Props> = (props) => {
  // Props
  const {
    columns,
    rows = 5,
    enableRowSelection = false,
    enablePagination = true,
  } = props;

  return (
    <div className="space-y-4 overflow-x-auto">
      {/* Bảng skeleton */}
      <div className="overflow-hidden  border border-gray-200 dark:border-gray-800">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow className="border-0 hover:bg-transparent">
              {enableRowSelection && (
                <TableHead className="w-12 ">
                  <Skeleton className="mx-auto h-4 w-4" />
                </TableHead>
              )}

              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index} className="py-4">
                  <Skeleton className="h-4 w-3/4" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-b-gray-100 dark:border-b-gray-800"
              >
                {enableRowSelection && (
                  <TableCell>
                    <Skeleton className="mx-auto h-4 w-4" />
                  </TableCell>
                )}

                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex} className="py-3">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination skeleton */}
      {enablePagination && (
        <div className="flex flex-col gap-4 px-2 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-[70px]" />
            </div>

            <div className="flex items-center space-x-1">
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-8" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTableSkeleton;
