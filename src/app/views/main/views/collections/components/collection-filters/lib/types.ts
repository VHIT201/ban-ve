import z from "zod";
import { FILTER_SCHEMA } from "./constants";

export type FilterFormValues = z.infer<typeof FILTER_SCHEMA>;

export interface Props {
  onFilterChange: (filters: FilterFormValues) => void;
    initialValues?: FilterFormValues;
}
