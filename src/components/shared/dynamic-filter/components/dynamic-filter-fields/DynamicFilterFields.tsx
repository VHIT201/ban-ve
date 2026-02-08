// Core
import { FC } from "react";
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// Component
const DynamicFilterFields: FC = () => {
  // Hooks
  const { form, schema, fieldConfig } = useDynamicFilterContext();

  // Template
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {Object.entries(getSchemaShape(schema)).map(([name, fieldSchema]) => {
        const config = fieldConfig[name];

        if (!config) return null;

        return (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <motion.div variants={item}>
                <FormItem className="min-w-0 space-y-2">
                  <FormLabel className="text-xs font-medium text-muted-foreground">
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
                    <FormDescription className="text-xs">
                      {config.description}
                    </FormDescription>
                  )}
                  <FormMessage className="text-xs" />
                </FormItem>
              </motion.div>
            )}
          />
        );
      })}
    </motion.div>
  );
};

export default DynamicFilterFields;
