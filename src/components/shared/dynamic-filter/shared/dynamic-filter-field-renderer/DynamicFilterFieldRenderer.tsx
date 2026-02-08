// Core
import { z } from "zod";
import { ReactNode } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

// App
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Internal
import { QueryBoundary } from "@/components/shared";
import {
  AutoCompleteFieldConfig,
  FieldConfig,
  SelectFieldConfig,
  SelectQueryFieldConfig,
} from "../../lib/types";
import { unwrapSchema } from "../../lib/utils";

interface Props {
  field: ControllerRenderProps<FieldValues, string>;
  name: string;
  config: FieldConfig;
  fieldSchema: unknown;
}

// Helper function để xác định field type từ Zod schema
const getFieldTypeFromSchema = (
  fieldSchema: z.ZodTypeAny,
): FieldConfig["type"] => {
  const unwrappedSchema = unwrapSchema(fieldSchema);

  if (unwrappedSchema instanceof z.ZodString) {
    return "text";
  } else if (unwrappedSchema instanceof z.ZodNumber) {
    return "number";
  } else if (unwrappedSchema instanceof z.ZodBoolean) {
    return "checkbox";
  } else {
    return "text";
  }
};

// Component
const DynamicFilterFieldRenderer = (props: Props): ReactNode => {
  // Props
  const { field, name, config, fieldSchema } = props;

  // Ưu tiên custom render function
  if (config.render) {
    return config.render({ field, name });
  }

  const fieldType =
    config.type ?? getFieldTypeFromSchema(fieldSchema as z.ZodTypeAny);

  switch (fieldType) {
    case "date":
      return null;

    case "date-range":
      return null;

    case "select": {
      const configSelect = config as SelectFieldConfig;

      return (
        <Select
          onValueChange={(val) => field.onChange(val)}
          value={field.value ?? ""}
        >
          <SelectTrigger className="w-full sm:min-w-[180px]">
            <SelectValue
              placeholder={configSelect.placeholder || `Select ${name}`}
            />
          </SelectTrigger>
          <SelectContent side="bottom" className="w-full">
            {configSelect.options?.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    case "select-query": {
      const configSelectQuery = config as SelectQueryFieldConfig;

      return (
        <Select
          onValueChange={(val) => field.onChange(val)}
          value={field.value ?? ""}
        >
          <SelectTrigger className="w-full sm:min-w-[180px]">
            <SelectValue placeholder={config.placeholder ?? `Select ${name}`} />
          </SelectTrigger>
          <SelectContent side="bottom" className="w-full">
            <QueryBoundary query={configSelectQuery.query}>
              {(selectData) =>
                selectData.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))
              }
            </QueryBoundary>
          </SelectContent>
        </Select>
      );
    }

    case "checkbox":
      return (
        <Checkbox
          checked={!!field.value}
          onCheckedChange={(val) => field.onChange(val)}
        />
      );

    case "number":
      return (
        <Input
          type="number"
          placeholder={config.placeholder}
          value={
            field.value === undefined || field.value === null
              ? ""
              : String(field.value)
          }
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value === "" ? undefined : parseFloat(value));
          }}
          className="w-full"
        />
      );

    case "auto-complete": {
      return null;
    }

    default:
      return (
        <Input
          type={config.type}
          placeholder={config.placeholder}
          {...field}
          className="w-full"
        />
      );
  }
};

export default DynamicFilterFieldRenderer;
