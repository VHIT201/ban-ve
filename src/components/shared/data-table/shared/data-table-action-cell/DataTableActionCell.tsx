import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { FC, Fragment } from "react";
import { Props } from "./lib/types";
import { useDataTableContext } from "../../DataTableContext";

const ActionColumn: FC<Props> = (props) => {
  // Props
  const { rowName, extraActions, onEdit, onDelete } = props;

  // Hooks
  const { openDeleteDialogAction } = useDataTableContext();

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }

    openDeleteDialogAction(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-[200px]">
        <DropdownMenuLabel>
          Thao tác với{" "}
          <span className="text-primary font-semibold">{rowName}</span>{" "}
        </DropdownMenuLabel>
        {extraActions}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>Chỉnh sửa</DropdownMenuItem>
        )}
        {onDelete && (
          <Fragment>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <Trash2Icon className="size-4" />
              Xóa dữ liệu
            </DropdownMenuItem>
          </Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionColumn;
