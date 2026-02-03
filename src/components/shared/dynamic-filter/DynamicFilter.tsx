"use client";

// Core
import { z } from "zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
// import { useTranslation } from 'react-i18next'
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

// App
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Internal
// import DatePicker from '../date-picker'
import QueryBoundary from "../query-boundary";
import {
  AutoCompleteFieldConfig,
  FieldConfig,
  Props,
  SelectFieldConfig,
  SelectQueryFieldConfig,
} from "./lib/types";
// import DateRangerPicker from '../date-ranger-picker/DateRangerPicker'
import {
  getDefaultValuesFromSchema,
  getSchemaShape,
  unwrapSchema,
} from "./lib/utils";
// import AutoComplete from '../auto-complete'
// import { AutoCompleteContent } from '../auto-complete/shared'

// Component
const DynamicFilter = <T extends z.ZodTypeAny>(props: Props<T>) => {
  const {
    schema,
    onSubmit,
    defaultValues,
    fieldConfig = {} as Record<string, FieldConfig>,
  } = props;

  // Hooks
  // const { t: translateFn } = useTranslation("components/shared/dynamic-filter");
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? getDefaultValuesFromSchema(schema),
  });

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

  // Hàm render field dựa trên Zod type và fieldType config
  const renderFormField = (
    field: ControllerRenderProps<FieldValues, string>,
    name: string,
    config: FieldConfig,
    fieldSchema: z.ZodTypeAny,
  ): ReactNode => {
    // Ưu tiên custom render function
    if (config.render) {
      return config.render({ field, name });
    }

    const fieldType = config.type ?? getFieldTypeFromSchema(fieldSchema);

    switch (fieldType) {
      case "date":
        // return <DatePicker />
        return <div>DatePicker component here</div>;

      case "date-range":
        // return <DateRangerPicker value={field.value} placeholder={config.placeholder} onChange={field.onChange} />
        return <div>DateRangerPicker component here</div>;

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
              <SelectValue
                placeholder={config.placeholder ?? `Select ${name}`}
              />
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
        const configAutoComplete = config as AutoCompleteFieldConfig;

        // return (
        //   <AutoComplete
        //     value={field.value}
        //     placeholder={configAutoComplete.placeholder}
        //     onChange={(value) => {
        //       field.onChange(value)
        //       configAutoComplete.onChange?.(value)
        //     }}
        //   >
        //     <QueryBoundary query={configAutoComplete.query}>
        //       {(autoCompleteData) => (
        //         <AutoCompleteContent
        //           items={autoCompleteData}
        //           onSelect={(value) => {
        //             field.onChange(value)
        //             configAutoComplete?.onSelect?.(value)
        //           }}
        //         />
        //       )}
        //     </QueryBoundary>
        //   </AutoComplete>
        // )
        return <div>AutoComplete component here</div>;
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 sm:p-4">
        {/* Grid responsive:
            - 1 col on mobile
            - 2 cols on small/tablet
            - 4 cols on large screens
        */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {Object.entries(getSchemaShape(schema)).map(([name, fieldSchema]) => {
            const config = fieldConfig[name] ?? {};

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
                      {renderFormField(
                        field,
                        name,
                        config,
                        fieldSchema as z.ZodTypeAny,
                      )}
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

          {/* Actions: span full width on mobile, align right on md+ */}
          <div className="mt-4 flex w-full flex-col justify-center gap-4 md:col-span-2 md:mt-0 md:flex-row md:justify-end lg:col-span-4">
            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => form.reset()}
            >
              Refresh
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              {/* {translateFn("applyFilter")} */}
              Apply Filter
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DynamicFilter;
