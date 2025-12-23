import { createContext } from "react";
import { DataTableContextValue } from "./types";

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const DATA_TABLE_CONTEXT =
  createContext<DataTableContextValue<any> | null>(null);
