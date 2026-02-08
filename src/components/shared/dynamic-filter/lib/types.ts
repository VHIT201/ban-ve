import { z } from "zod";
import { ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { UseQueryResult } from "@tanstack/react-query";

export type FieldRenderProps = ControllerRenderProps<FieldValues, string>;

type OptionValue = string | number;
export type SelectOption = { label: string; value: OptionValue };

export type FieldType =
  | "text"
  | "number"
  | "checkbox"
  | "select-query"
  | "select"
  | "date"
  | "date-range"
  | "auto-complete";

export interface FieldConfig {
  label?: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  render?: (props: { field: FieldRenderProps; name: string }) => ReactNode;
}

export interface SelectFieldConfig extends Omit<FieldConfig, "type"> {
  type: "select";
  options: SelectOption[];
}
export interface SelectQueryFieldConfig extends Omit<FieldConfig, "type"> {
  type: "select-query";
  query: UseQueryResult<SelectOption[]>;
  onSearch?: (value: string) => Promise<SelectOption[]>;
}

export interface AutoCompleteFieldConfig extends Omit<FieldConfig, "type"> {
  type: "auto-complete";
  query: UseQueryResult<SelectOption[]>;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  onSearch?: (value: string) => Promise<SelectOption[]>;
}

export interface Props<T extends z.ZodTypeAny> {
  schema: T;
  onSubmit: SubmitHandler<z.infer<T>>;
  defaultValues?: Partial<z.infer<T>>;
  fieldConfig?: Record<string, FieldConfig>;
  children?: ReactNode;
}

export interface DynamicFilterContextValue {
  // Props
  form: UseFormReturn<FieldValues>;
  schema: z.ZodTypeAny;
  fieldConfig: Record<string, FieldConfig>;
  onSubmit: SubmitHandler<FieldValues>;
}
