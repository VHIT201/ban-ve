import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useDataTableContext } from "../../lib/hooks";

const DEFAULT_PAGE_SIZE = 10;

const DataTablePagination = <TData,>() => {
  const { table, enablePagination, manualPagination } =
    useDataTableContext<TData>();

  if (!enablePagination || !manualPagination) return null;

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination?.pageIndex ?? 0;
const currentPage = pageIndex + 1; // UI = 1-based

  const pageSize = table.getState().pagination?.pageSize || DEFAULT_PAGE_SIZE;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-left");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        pages.push("ellipsis-right");
      }
      pages.push(pageCount);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex flex-col gap-4 px-2 md:flex-row md:items-center md:justify-between p-2">
      <div className="text-muted-foreground flex-1 text-sm dark:text-gray-400">
        Hiển thị trang{" "}
        <span className="text-primary font-medium dark:text-gray-200">
          {currentPage}
        </span>{" "}
        trên{" "}
        <span className="text-primary font-medium dark:text-gray-200">
          {pageCount}
        </span>{" "}
        trang
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:space-x-6 lg:space-x-8">
        <div className="flex min-w-[200px] shrink-0 items-center space-x-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Số dòng hiển thị
          </p>
          <Select
            onValueChange={(value) => {
              table.setPagination({
                pageIndex: 0, // Reset to first page (0-based) when changing page size
                pageSize: Number(value),
              });
            }}
            value={`${pageSize}`}
            defaultValue={`${DEFAULT_PAGE_SIZE}`}
          >
            <SelectTrigger className="flex-1 h-8 w-[70px] border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-white dark:bg-gray-900">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem
                  key={size}
                  value={`${size}`}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={currentPage <= 1}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={currentPage <= 1}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {pageNumbers.map((page, index) => (
              <PaginationItem key={index}>
                {page === "ellipsis-left" || page === "ellipsis-right" ? (
                  <PaginationEllipsis className="text-gray-400" />
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    className={`h-8 w-8 p-0 ${
                      currentPage === page
                        ? "bg-primary hover:bg-primary/90"
                        : "hover:bg-primary/10 dark:hover:bg-primary/20"
                    } `}
                    onClick={() => table.setPageIndex(Number(page) - 1)} // Convert to 0-based index for React Table
                  >
                    {page}
                  </Button>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <Button
                variant="outline"
                className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                className="hover:bg-primary/10 dark:hover:bg-primary/20 h-8 w-8 p-0"
                onClick={() => table.setPageIndex(pageCount - 1)} // Convert to 0-based index
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DataTablePagination;
