import { isAxiosError } from "axios";

export const extractErrorMessage = (error: unknown) => {
  console.error("Extracting error message from:", error);
  if (typeof error === "string") {
    return error;
  }

  const axiosErrorResponse = isAxiosError(error) ? error.response : null;

  if (axiosErrorResponse?.status === 500) {
    return "Đã có lỗi xảy ra trên máy chủ, vui lòng thử lại sau";
  }

  console.error("Extracted error response:", axiosErrorResponse);

  const errorMessage =
    axiosErrorResponse?.data.message ??
    "Đã có lỗi xảy ra, vui lòng thử lại sau";

  return errorMessage;
};
