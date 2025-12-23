import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { useDataTableContext } from "../../lib/hooks";
import { cn } from "@/utils/ui";
import { Checkbox } from "@/components/ui/checkbox";

const DataTableHeader = <TData,>() => {
  const { table, enableRowSelection, classNames } =
    useDataTableContext<TData>();

  return (
    <TableHeader
      className={cn(
        "dark:from-primary/70 dark:to-primary/60 bg-primary backdrop-blur-md",
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
                className="[&>span]:data-[state=checked]:text-primary [&>span]:border-white [&>span]:rounded-sm [&>span]:bg-white/10 [&>span]:data-[state=checked]:border-white [&>span]:data-[state=checked]:bg-white"
              />
            </TableHead>
          )}

          {headerGroup.headers.map((header, index) => (
            <TableHead
              key={header.id}
              className={`py-4 font-bold text-white ${
                index === headerGroup.headers.length - 1 ? "rounded-tr-xl" : ""
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
  );
};

export default DataTableHeader;
