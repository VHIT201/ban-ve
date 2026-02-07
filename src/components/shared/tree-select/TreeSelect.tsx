"use client";

import React, { useState, useMemo } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Type definitions
export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
}

interface TreeSelectProps {
  multiple?: boolean;
  nodes: TreeNode[];
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  maxHeight?: string;
  className?: string;
}

interface ExpandedState {
  [key: string]: boolean;
}

interface FilteredTreeState {
  nodes: TreeNode[];
  expanded: ExpandedState;
}

// Recursive function to flatten tree for search
const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
  return nodes.reduce((acc: TreeNode[], node) => {
    acc.push(node);
    if (node.children) {
      acc.push(...flattenTree(node.children));
    }
    return acc;
  }, []);
};

// Filter tree based on search query
const filterTree = (nodes: TreeNode[], query: string): FilteredTreeState => {
  const lowerQuery = query.toLowerCase();
  const flatNodes = flattenTree(nodes);
  const matchingIds = new Set<string>();
  const parentIds = new Set<string>();

  // Find all matching nodes and their parents
  flatNodes.forEach((node) => {
    if (node.label.toLowerCase().includes(lowerQuery)) {
      matchingIds.add(node.id);
      // Mark all ancestors
      const findParents = (nodes: TreeNode[], targetId: string): string[] => {
        for (const n of nodes) {
          if (n.children) {
            if (n.children.some((child) => child.id === targetId)) {
              return [n.id, ...findParents(nodes, n.id)];
            }
            const parents = findParents(n.children, targetId);
            if (parents.length > 0) {
              return [n.id, ...parents];
            }
          }
        }
        return [];
      };
      findParents(nodes, node.id).forEach((id) => parentIds.add(id));
    }
  });

  // Build expanded state for search results
  const expanded: ExpandedState = {};
  Array.from(parentIds).forEach((id) => {
    expanded[id] = true;
  });

  // Filter tree recursively
  const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
    return nodes
      .filter((node) => matchingIds.has(node.id) || parentIds.has(node.id))
      .map((node) => ({
        ...node,
        children: node.children ? filterNodes(node.children) : undefined,
      }));
  };

  return {
    nodes: query ? filterNodes(nodes) : nodes,
    expanded,
  };
};

// Tree node component
interface TreeNodeComponentProps {
  multiple?: boolean;
  node: TreeNode;
  selected: Set<string>;
  onToggle: (ids: string[]) => void;
  onToggleExpand: (id: string) => void;
  expanded: ExpandedState;
  searchQuery: string;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  multiple = true,
  node,
  selected,
  onToggle,
  onToggleExpand,
  expanded,
  searchQuery,
}) => {
  const isExpanded = expanded[node.id] ?? false;
  const isSelected = selected.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const isDisabled = node.disabled ?? false;

  const handleCheckboxChange = (checked: boolean) => {
    if (!isDisabled) {
      if (multiple) {
        const childIds = node.children
          ? node.children.map((child) => child.id)
          : [];
        const withChildrenIds = node.children
          ? (node.children
              .map((child) =>
                child?.children?.map((grandchild) => grandchild.id),
              )
              .filter(Boolean)
              .flat() as string[])
          : [];

        node.children && node.children.length > 0
          ? onToggle([node.id, ...childIds, ...withChildrenIds])
          : onToggle([node.id]);
      } else {
        onToggle([node.id]);
      }
    }
  };

  const handleExpandClick = () => {
    if (hasChildren) {
      onToggleExpand(node.id);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-primary/10 transition-colors">
        <button
          onClick={handleExpandClick}
          className={cn(
            "flex-shrink-0 p-0 h-5 w-5 flex items-center justify-center transition-transform",
            !hasChildren && "invisible",
            hasChildren && isExpanded && "rotate-90",
          )}
          tabIndex={-1}
        >
          {hasChildren && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <Checkbox
          checked={isSelected}
          onCheckedChange={handleCheckboxChange}
          disabled={isDisabled}
          className="cursor-pointer"
        />
        <label
          className={cn(
            "flex-1 text-sm cursor-pointer user-select-none",
            isSelected && "text-primary",
            isDisabled && "opacity-50 cursor-not-allowed",
          )}
          onClick={() => handleCheckboxChange(!isSelected)}
        >
          {node.label}
        </label>
      </div>

      {/* Render children if expanded */}
      {hasChildren && isExpanded && (
        <div className="ml-4 flex flex-col gap-0">
          {node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              selected={selected}
              onToggle={onToggle}
              onToggleExpand={onToggleExpand}
              expanded={expanded}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Tree Select component
const TreeSelect: React.FC<TreeSelectProps> = ({
  multiple = true,
  nodes,
  value,
  onChange,
  placeholder = "Select items...",
  searchable = true,
  maxHeight = "400px",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const selected = useMemo(() => new Set(value), [value]);

  // Apply filtering if search query exists
  const { nodes: filteredNodes, expanded: searchExpanded } = useMemo(() => {
    return filterTree(nodes, searchQuery);
  }, [nodes, searchQuery]);

  // Use search-expanded state when searching, otherwise use user-controlled state
  const displayExpanded = useMemo(
    () => (searchQuery ? searchExpanded : expanded),
    [searchQuery, expanded, searchExpanded],
  );

  const handleToggle = (ids: string[]) => {
    if (multiple) {
      const next = new Set(value);

      ids.forEach((id) => {
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      });

      onChange(Array.from(next));
    } else {
      const id = ids[0];
      if (id) {
        if (selected.has(id)) {
          onChange([]);
        } else {
          onChange([id]);
        }
      }
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
    setSearchQuery("");
  };

  const selectedLabel =
    value.length === 0
      ? placeholder
      : value.length === 1
        ? `1 danh mục đã chọn`
        : `${value.length} danh mục đã chọn`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-transparent hover:bg-gray-100 hover:text-primary border-foreground/20",
            className,
          )}
        >
          <span className="truncate text-left font-medium!">
            {selectedLabel}
          </span>
          <div className="flex items-center gap-1">
            {value.length > 0 && (
              <X className="h-4 w-4 opacity-50 hover:opacity-100" />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <div className="flex flex-col">
          {/* Search input */}
          {searchable && (
            <div className="border-b p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm . . ."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Tree nodes */}
          <ScrollArea style={{ maxHeight }} className="w-full overflow-y-auto">
            <div className="p-2 flex flex-col gap-1">
              {filteredNodes.length === 0 ? (
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                  No items found
                </div>
              ) : (
                filteredNodes.map((node) => (
                  <TreeNodeComponent
                    multiple={multiple}
                    key={node.id}
                    node={node}
                    selected={selected}
                    onToggle={handleToggle}
                    onToggleExpand={handleToggleExpand}
                    expanded={displayExpanded}
                    searchQuery={searchQuery}
                  />
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer with clear button */}
          {value.length > 0 && (
            <div className="border-t p-2 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs"
              >
                Xóa chọn
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TreeSelect;
