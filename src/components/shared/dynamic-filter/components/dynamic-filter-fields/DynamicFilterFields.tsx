// Core
import { FC } from "react";

// App
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Internal
import { useDynamicFilterContext } from "../../lib/hooks";
import { getSchemaShape } from "../../lib/utils";
import { DynamicFilterFieldRenderer } from "../../shared";

// Component
const DynamicFilterFields: FC = () => {
  // Hooks
  const { form, schema, fieldConfig } = useDynamicFilterContext();

  // Template
  return (
    <>
      {Object.entries(getSchemaShape(schema)).map(([name, fieldSchema]) => {
        const config = fieldConfig[name];

        if (!config) return null;

        return (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              // min-w-0 để tránh overflow trong flex/grid
              <FormItem className="min-w-0">
                <FormLabel className="text-sm">
                  {config.label ?? name}
                </FormLabel>
                <FormControl>
                  <DynamicFilterFieldRenderer
                    field={field}
                    name={name}
                    config={config}
                    fieldSchema={fieldSchema}
                  />
                </FormControl>
                {config.description && (
                  <FormDescription>{config.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </>
  );
};

export default DynamicFilterFields;
