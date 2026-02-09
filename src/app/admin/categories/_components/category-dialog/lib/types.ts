import z from "zod";
import { CATEGORY_SCHEMA } from "./constants";

export type CategoryFormValues = z.infer<typeof CATEGORY_SCHEMA>;
