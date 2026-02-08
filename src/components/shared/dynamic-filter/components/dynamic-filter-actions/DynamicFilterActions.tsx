// Core
import { FC } from "react";

// App
import { Button } from "@/components/ui/button";

// Internal
import { useDynamicFilterContext } from "../../lib/hooks";
import { cn } from "@/utils/ui";

export interface Props {
  className?: string;
}

// Component
const DynamicFilterActions: FC<Props> = (props) => {
  // Props
  const { className } = props;

  // Hooks
  const { form } = useDynamicFilterContext();

  // Template
  return (
    <div
      className={cn(
        "mt-4 flex w-full flex-col justify-center gap-2 md:col-span-2 md:mt-0 md:flex-row md:justify-end lg:col-span-4",
        className,
      )}
    >
      <Button
        variant="outline"
        className="w-full md:w-auto"
        onClick={() => form.reset()}
      >
        {"Refresh"}
      </Button>
      <Button type="submit" className="w-full md:w-auto">
        {"Apply Filter"}
      </Button>
    </div>
  );
};

export default DynamicFilterActions;
