// Core
import { cn } from "@/utils/ui";
import { FC, ReactNode } from "react";

export interface Props {
  className?: string;
  children?: ReactNode;
}

// Component
const DynamicFilterGrid: FC<Props> = (props) => {
  // Props
  const { children, className } = props;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DynamicFilterGrid;
