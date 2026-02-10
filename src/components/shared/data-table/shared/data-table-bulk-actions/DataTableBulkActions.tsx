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
import { motion, AnimatePresence } from "framer-motion";

import { Props } from "./lib/types";
import { useDataTableContext } from "../../lib/hooks";

/**
 * A modular toolbar for displaying bulk actions when table rows are selected.
 * Supports both internal table selection and external selectedRows prop for cross-page selection.
 *
 * @template TData The type of data in the table.
 * @param {object} props The component props.
 * @param {Table<TData>} props.table The react-table instance.
 * @param {string} props.entityName The name of the entity being acted upon (e.g., "task", "user").
 * @param {React.ReactNode} props.children The action buttons to be rendered inside the toolbar.
 * @param {TData[]} props.externalSelectedRows Optional external selected rows for cross-page selection.
 * @returns {React.ReactNode | null} The rendered component or null if no rows are selected.
 */
const DataTableBulkActions: FC<Props> = (props) => {
  // Props
  const { entityName, actions, externalSelectedRows } = props;

  // Hooks
  const { table } = useDataTableContext();

  // Determine selection source - prefer external if provided
  const internalSelectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedRows = externalSelectedRows || internalSelectedRows;
  const selectedCount = externalSelectedRows?.length ?? selectedRows.length;

  const toolbarRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedCount > 0) {
      setIsVisible(true);
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
    } else {
      setIsVisible(false);
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

      <AnimatePresence mode="wait">
        {isVisible && selectedCount > 0 && (
          <motion.div
            ref={toolbarRef}
            role="toolbar"
            aria-label={"Bulk actions for selected"}
            aria-describedby="bulk-actions-description"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className={cn(
              "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl",
              "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
            )}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "p-2 shadow-xl",
                "rounded-xl border",
                "bg-background/95 supports-backdrop-filter:bg-background/60 backdrop-blur-lg",
                "flex items-center gap-x-2",
              )}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
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
                  </motion.div>
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
                <motion.div
                  key={selectedCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Badge
                    variant="default"
                    aria-label={`${selectedCount} selected`}
                    className="rounded-full"
                  >
                    {selectedCount}
                  </Badge>
                </motion.div>{" "}
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
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: index * 0.05,
                          scale: {
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          },
                          opacity: { duration: 0.2 },
                          rotate: {
                            type: "tween",
                            duration: 0.3,
                            ease: "easeInOut",
                          },
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={action.variant || "default"}
                          size="icon"
                          onClick={action.onAction}
                          aria-label={action.label}
                          title={action.label}
                          className="size-8 rounded-md shadow-md transition-shadow"
                        >
                          {<ActionIcon className="size-4" />}
                          <span className="sr-only">{action.label}</span>
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{action.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DataTableBulkActions;
