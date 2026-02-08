// Core
import { FC } from "react";
import { motion } from "framer-motion";

// App
import { Button } from "@/components/ui/button";
import { RotateCcw, Search } from "lucide-react";

// Internal
import { useDynamicFilterContext } from "../../lib/hooks";
import { cn } from "@/utils/ui";

export interface Props {
  className?: string;
  resetLabel?: string;
  submitLabel?: string;
}

// Component
const DynamicFilterActions: FC<Props> = (props) => {
  // Props
  const { className, resetLabel = "Đặt lại", submitLabel = "Áp dụng" } = props;

  // Hooks
  const { form } = useDynamicFilterContext();

  // Template
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className={cn(
        "flex w-full flex-col-reverse gap-2 sm:flex-row pt-4 border-t border-border/50",
        className,
      )}
    >
      <Button
        type="button"
        variant="outline"
        className="w-full sm:flex-1 gap-2"
        onClick={() => form.reset()}
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {resetLabel}
      </Button>
      <Button type="submit" className="w-full sm:flex-1 gap-2">
        <Search className="h-3.5 w-3.5" />
        {submitLabel}
      </Button>
    </motion.div>
  );
};

export default DynamicFilterActions;
