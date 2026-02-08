// Core
import { z } from "zod";
import { useMemo, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assign } from "lodash-es";

// App
import { Form } from "@/components/ui/form";

// Internal
import { Props } from "./lib/types";
import { getDefaultValuesFromSchema } from "./lib/utils";
import { DYNAMIC_FILTER_CONTEXT } from "./lib/constants";
import {
  DynamicFilterFields,
  DynamicFilterActions,
  DynamicFilterGrid,
  DynamicFilterSidebar,
  DynamicFilterSection,
} from "./components";

interface DynamicFilterRootProps<T extends z.ZodTypeAny> extends Props<T> {
  children?: ReactNode;
}

// Component
const DynamicFilter = <T extends z.ZodTypeAny>(
  props: DynamicFilterRootProps<T>,
) => {
  const {
    schema,
    onSubmit,
    defaultValues,
    fieldConfig = {} as Record<string, any>,
    children,
  } = props;

  // Hooks
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? getDefaultValuesFromSchema(schema),
  });

  // Context Values
  const contextValues = useMemo(
    () => ({
      form,
      schema,
      fieldConfig,
      onSubmit,
    }),
    [form, schema, fieldConfig, onSubmit],
  );

  // Template
  return (
    <DYNAMIC_FILTER_CONTEXT.Provider value={contextValues}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      </Form>
    </DYNAMIC_FILTER_CONTEXT.Provider>
  );
};

export default assign(DynamicFilter, {
  Fields: DynamicFilterFields,
  Actions: DynamicFilterActions,
  Grid: DynamicFilterGrid,
  Sidebar: DynamicFilterSidebar,
  Section: DynamicFilterSection,
});
