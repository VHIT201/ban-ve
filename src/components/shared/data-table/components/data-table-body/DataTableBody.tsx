import { flexRender } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell, TableBody } from "@/components/ui/table";
import { useDataTableContext } from "../../lib/hooks";

const DataTableBody = <TData,>() => {
  const { table, enableRowSelection, classNames } =
    useDataTableContext<TData>();

  return (
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
  );
};

export default DataTableBody;
