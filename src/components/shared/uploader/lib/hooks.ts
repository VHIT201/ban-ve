import { useContext } from "react";
import { UPLOADER_CONTEXT } from "./constants";

export const useUploaderContext = () => {
  const context = useContext(UPLOADER_CONTEXT);

  if (!context) {
    throw new Error(
      "useUploaderContext must be used within an Uploader component"
    );
  }

  return context;
};
