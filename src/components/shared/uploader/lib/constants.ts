import { createContext } from "react";
import { UploaderContextValue } from "./types";

export const UPLOADER_CONTEXT = createContext<UploaderContextValue | null>(
  null
);

export const DEFAULT_MAX_FILES = 10;
export const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
export const DEFAULT_ACCEPT = {
  "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
};
