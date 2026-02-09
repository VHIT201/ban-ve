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
import { Slider } from "@/components/ui/slider";

// Internal
import { QueryBoundary, TreeSelect } from "@/components/shared";
import {
  AutoCompleteFieldConfig,
  FieldConfig,
  SelectFieldConfig,
  SelectQueryFieldConfig,
  TreeFieldConfig,
  NumberRangeFieldConfig,
  TreeNode,
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
          <SelectTrigger className="w-full h-9 text-sm">
            <SelectValue
              placeholder={configSelect.placeholder || `Select ${name}`}
            />
          </SelectTrigger>
          <SelectContent side="bottom" align="start">
            {configSelect.options?.map((option) => (
              <SelectItem
                key={option.value}
                value={String(option.value)}
                className="text-sm"
              >
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
          <SelectTrigger className="w-full h-9 text-sm">
            <SelectValue placeholder={config.placeholder ?? `Select ${name}`} />
          </SelectTrigger>
          <SelectContent side="bottom" align="start">
            <QueryBoundary query={configSelectQuery.query}>
              {(selectData) =>
                selectData.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                    className="text-sm"
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
        <div className="flex items-center space-x-2 py-1">
          <Checkbox
            checked={!!field.value}
            onCheckedChange={(val) => field.onChange(val)}
            className="h-4 w-4"
          />
        </div>
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
          className="w-full h-9 text-sm"
        />
      );

    case "auto-complete": {
      return null;
    }

    case "tree": {
      const configTree = config as TreeFieldConfig;
      const nodes =
        "data" in configTree.nodes ? configTree.nodes.data : configTree.nodes;

      return (
        <TreeSelect
          nodes={nodes || []}
          value={Array.isArray(field.value) ? field.value : []}
          onChange={(selected) => field.onChange(selected)}
          placeholder={configTree.placeholder || `Select ${name}`}
          searchable={configTree.searchable ?? true}
          maxHeight={configTree.maxHeight || "300px"}
          multiple={true}
        />
      );
    }

    case "number-range": {
      const configRange = config as NumberRangeFieldConfig;
      const min = configRange.min ?? 0;
      const max = configRange.max ?? 100;
      const step = configRange.step ?? 1;
      const showInputs = configRange.showInputs ?? true;
      const formatValue =
        configRange.formatValue || ((val: number) => String(val));

      const rangeValue = Array.isArray(field.value) ? field.value : [min, max];

      return (
        <div className="space-y-3">
          <Slider
            value={rangeValue}
            onValueChange={(value) => field.onChange(value)}
            min={min}
            max={max}
            step={step}
            className="w-full"
          />
          {showInputs && (
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <Input
                  type="number"
                  value={rangeValue[0] ?? min}
                  onChange={(e) => {
                    const newMin = parseFloat(e.target.value) || min;
                    const validMin = Math.min(newMin, rangeValue[1]);
                    field.onChange([validMin, rangeValue[1]]);
                  }}
                  placeholder={String(min)}
                  className="w-full h-9 text-sm"
                />
                <span className="text-xs text-gray-500 block">
                  {formatValue(rangeValue[0] ?? min)}
                </span>
              </div>
              <span className="text-gray-400 text-sm">-</span>
              <div className="flex-1 space-y-1">
                <Input
                  type="number"
                  value={rangeValue[1] ?? max}
                  onChange={(e) => {
                    const newMax = parseFloat(e.target.value) || max;
                    const validMax = Math.max(newMax, rangeValue[0]);
                    field.onChange([rangeValue[0], validMax]);
                  }}
                  placeholder={String(max)}
                  className="w-full h-9 text-sm"
                />
                <span className="text-xs text-gray-500 block">
                  {formatValue(rangeValue[1] ?? max)}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    default:
      return (
        <Input
          type={config.type}
          placeholder={config.placeholder}
          {...field}
          className="w-full h-9 text-sm"
        />
      );
  }
};

export default DynamicFilterFieldRenderer;
