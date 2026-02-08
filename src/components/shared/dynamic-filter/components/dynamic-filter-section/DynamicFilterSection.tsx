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
  // States
  return (
    <div className="border-b border-border">
      <Accordion type="single" collapsible>
        <AccordionItem value={id}>
          <AccordionTrigger className="w-full px-4 py-3 text-left font-medium">
            {title}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="flex flex-col gap-4">{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DynamicFilterSection;
