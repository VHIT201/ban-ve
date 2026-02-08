"use client";

import { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  open?: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

const DynamicFilterSidebar: FC<Props> = (props) => {
  // Props
  const { open, children, onClose } = props;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: open ? 320 : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="relative h-screen border-r border-border/50 bg-background/95 backdrop-blur-sm overflow-hidden z-50"
      >
        <motion.div
          initial={false}
          animate={{ x: open ? 0 : -320 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="h-full w-80 flex flex-col"
        >
          {/* Header */}
          <div className="relative px-6 py-5 border-b border-border/50">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-base font-semibold tracking-tight">
                  Bộ lọc
                </h3>
                <p className="text-xs text-muted-foreground">
                  Tùy chỉnh kết quả tìm kiếm
                </p>
              </div>
              {onClose && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 -mt-1 -mr-2 lg:hidden"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="px-6 py-4">{children}</div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
};

export default DynamicFilterSidebar;
