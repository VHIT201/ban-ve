import { flexRender } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/ui";
import { useDataTableContext } from "../DataTableContext";

export const DataTableContent = <TData,>() => {
  const { table, enableRowSelection, classNames } =
    useDataTableContext<TData>();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <Table>
        <TableHeader
          className={cn(
            "dark:from-primary/70 dark:to-primary/60 bg-primary/90 backdrop-blur-md",
            classNames?.header
          )}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-0 hover:bg-transparent"
            >
              {enableRowSelection && (
                <TableHead className="w-12 rounded-tl-xl">
                  <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) =>
                      table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                    className="[&>span]:data-[state=checked]:text-primary [&>span]:border-white [&>span]:bg-white/10 [&>span]:data-[state=checked]:border-white [&>span]:data-[state=checked]:bg-white"
                  />
                </TableHead>
              )}

              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={`py-4 font-bold text-white ${
                    index === headerGroup.headers.length - 1
                      ? "rounded-tr-xl"
                      : ""
                  } `}
                >
                  <div className="flex items-center space-x-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`border-b-gray-100 dark:border-b-gray-800 ${
                  row.getIsSelected()
                    ? "bg-primary/10! hover:bg-primary/50 dark:bg-primary/20"
                    : "hover:bg-primary/10 dark:hover:bg-gray-800/30"
                } `}
              >
                {enableRowSelection && (
                  <TableCell>
                    <Checkbox
                      checked={row.getIsSelected()}
                      onCheckedChange={(value) => row.toggleSelected(!!value)}
                      aria-label="Select row"
                      className="[&>span]:data-[state=checked]:bg-primary [&>span]:data-[state=checked]:border-primary [&>span]:border-gray-300"
                    />
                  </TableCell>
                )}

                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={
                  table.getAllColumns().length + (enableRowSelection ? 1 : 0)
                }
                className="h-24 text-center text-gray-500 dark:text-gray-400"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
