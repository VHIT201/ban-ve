"use client";

import { FC, ReactNode } from "react";

interface Props {
  open?: boolean;
  children?: ReactNode;
}

const DynamicFilterSidebar: FC<Props> = (props) => {
  // Props
  const { open, children } = props;

  return (
    <div
      className={`border-r border-border transition-all duration-300 ${
        open ? "w-80" : "w-0"
      } overflow-hidden`}
    >
      <div className="h-screen flex flex-col bg-background border-r border-border">
        {/* Header */}
        <div className="px-4 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Bộ lọc</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Tùy chỉnh kết quả tìm kiếm
          </p>
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto">{children} </div>
      </div>
    </div>
  );
};

export default DynamicFilterSidebar;
