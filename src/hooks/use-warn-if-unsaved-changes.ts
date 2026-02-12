import { useEffect, useCallback, useRef } from "react";
export function useWarnIfUnsavedChanges(
  isDirty: boolean,
  message: string = "Bạn có thay đổi chưa được lưu. Bạn có chắc muốn rời trang?",
) {
  const isNavigatingRef = useRef(false);

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

  // Cảnh báo khi nhấn nút back/forward của trình duyệt
  useEffect(() => {
    if (!isDirty) return;

    const handlePopState = (e: PopStateEvent) => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
        return;
      }

      const shouldNavigate = window.confirm(message);

      if (!shouldNavigate) {
        // Nếu user chọn Cancel, push lại current URL để stay on page
        window.history.pushState(null, "", window.location.href);
      } else {
        isNavigatingRef.current = true;
      }
    };

    // Push một state để có thể detect popstate
    window.history.pushState(null, "", window.location.href);

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty, message]);

  // Trả về hàm để confirm khi navigate
  const confirmNavigation = useCallback(() => {
    if (!isDirty) return true;
    return window.confirm(message);
  }, [isDirty, message]);

  return { confirmNavigation };
}
