// Core
import { cn } from "@/utils/ui";
import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

export interface Props {
  className?: string;
  children?: ReactNode;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Component
const DynamicFilterGrid: FC<Props> = (props) => {
  // Props
  const { children, className } = props;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export default DynamicFilterGrid;
