import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DynamicFilterSection = ({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-border/50 last:border-0"
    >
      <Accordion type="single" collapsible defaultValue={id}>
        <AccordionItem value={id} className="border-0">
          <AccordionTrigger className="w-full px-0 py-3 text-sm font-medium hover:no-underline">
            {title}
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-4 pt-1">
            <div className="flex flex-col gap-3">{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default DynamicFilterSection;
