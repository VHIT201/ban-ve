import { useState, useEffect, useRef, FC } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Props } from "./lib/types";
import { useDataTableContext } from "../../lib/hooks";

/**
 * A modular toolbar for displaying bulk actions when table rows are selected.
 *
 * @template TData The type of data in the table.
 * @param {object} props The component props.
 * @param {Table<TData>} props.table The react-table instance.
 * @param {string} props.entityName The name of the entity being acted upon (e.g., "task", "user").
 * @param {React.ReactNode} props.children The action buttons to be rendered inside the toolbar.
 * @returns {React.ReactNode | null} The rendered component or null if no rows are selected.
 */
const DataTableBulkActions: FC<Props> = (props) => {
  // Props
  const { entityName, actions } = props;

  // Hooks
  const { table } = useDataTableContext();

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (selectedCount > 0) {
      const message = `${selectedCount} ${entityName}${
        selectedCount > 1 ? "s" : ""
      } selected. Bulk actions toolbar is available.`;

      // Use queueMicrotask to defer state update and avoid cascading renders
      queueMicrotask(() => {
        setAnnouncement(message);
      });

      // Clear announcement after a delay
      const timer = setTimeout(() => setAnnouncement(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedCount, entityName]);

  const handleClearSelection = () => {
    table.resetRowSelection();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const buttons = toolbarRef.current?.querySelectorAll("button");
    if (!buttons) return;

    const currentIndex = Array.from(buttons).findIndex(
      (button) => button === document.activeElement,
    );

    switch (event.key) {
      case "ArrowRight": {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex]?.focus();
        break;
      }
      case "ArrowLeft": {
        event.preventDefault();
        const prevIndex =
          currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
        buttons[prevIndex]?.focus();
        break;
      }
      case "Home":
        event.preventDefault();
        buttons[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        buttons[buttons.length - 1]?.focus();
        break;
      case "Escape": {
        // Check if the Escape key came from a dropdown trigger or content
        // We can't check dropdown state because Radix UI closes it before our handler runs
        const target = event.target as HTMLElement;
        const activeElement = document.activeElement as HTMLElement;

        // Check if the event target or currently focused element is a dropdown trigger
        const isFromDropdownTrigger =
          target?.getAttribute("data-slot") === "dropdown-menu-trigger" ||
          activeElement?.getAttribute("data-slot") ===
            "dropdown-menu-trigger" ||
          target?.closest('[data-slot="dropdown-menu-trigger"]') ||
          activeElement?.closest('[data-slot="dropdown-menu-trigger"]');

        // Check if the focused element is inside dropdown content (which is portaled)
        const isFromDropdownContent =
          activeElement?.closest('[data-slot="dropdown-menu-content"]') ||
          target?.closest('[data-slot="dropdown-menu-content"]');

        if (isFromDropdownTrigger || isFromDropdownContent) {
          // Escape was meant for the dropdown - don't clear selection
          return;
        }

        // Escape was meant for the toolbar - clear selection
        event.preventDefault();
        handleClearSelection();
        break;
      }
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcement}
      </div>

      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label={`Bulk actions for ${selectedCount} selected ${entityName}${
          selectedCount > 1 ? "s" : ""
        }`}
        aria-describedby="bulk-actions-description"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl",
          "transition-all delay-100 duration-300 ease-out hover:scale-105",
          "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
        )}
      >
        <div
          className={cn(
            "p-2 shadow-xl",
            "rounded-xl border",
            "bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur-lg",
            "flex items-center gap-x-2",
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleClearSelection}
                className="size-6 rounded-full"
                aria-label="Đóng"
                title="Đóng  (Escape)"
              >
                <X />
                <span className="sr-only">Đóng </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Đóng (Escape)</p>
            </TooltipContent>
          </Tooltip>

          <Separator
            className="h-5"
            orientation="vertical"
            aria-hidden="true"
          />

          <div
            className="flex items-center gap-x-1 text-sm"
            id="bulk-actions-description"
          >
            <Badge
              variant="default"
              aria-label={`${selectedCount} selected`}
              className="rounded-full"
            >
              {selectedCount}
            </Badge>{" "}
            <span className="hidden sm:inline">
              {entityName}
              {selectedCount > 1 ? "s" : ""}
            </span>{" "}
            đã chọn
          </div>

          <Separator className="h-5! mx-2" orientation="vertical" />

          {actions.map((action, index) => {
            const ActionIcon = action.icon;

            return (
              <Tooltip key={`action-${action.label}-${index}`}>
                <TooltipTrigger asChild>
                  <Button
                    variant={action.variant || "default"}
                    size="icon"
                    onClick={action.onAction}
                    aria-label={action.label}
                    title={action.label}
                    className="size-8 rounded-md shadow-md hover:scale-105 transition-transform hover:shadow-lg duration-500"
                  >
                    {<ActionIcon className="size-4" />}
                    <span className="sr-only">{action.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DataTableBulkActions;
