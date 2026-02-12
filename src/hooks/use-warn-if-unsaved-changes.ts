import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useWarnIfUnsavedChanges(
  isDirty: boolean,
  message: string = "Bạn có thay đổi chưa được lưu. Bạn có chắc muốn rời trang?",
) {
  // Cảnh báo khi refresh/đóng tab
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, message]);

  // Trả về hàm để confirm khi navigate
  const confirmNavigation = useCallback(() => {
    if (!isDirty) return true;
    return window.confirm(message);
  }, [isDirty, message]);

  return { confirmNavigation };
}
