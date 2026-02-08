// Core
import { createContext } from "react";

// Internal
import { DynamicFilterContextValue } from "./types";

export const DYNAMIC_FILTER_CONTEXT =
  createContext<DynamicFilterContextValue | null>(null);
