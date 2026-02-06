"use client";

import { FC, ReactNode, useEffect } from "react";
import "@/styles/image-protection.css";

interface ImageProtectionProps {
  children: ReactNode;
  className?: string;
}

const ImageProtection: FC<ImageProtectionProps> = ({ children, className }) => {
  useEffect(() => {
    let notificationShown = false;

    const showWarning = () => {
      if (!notificationShown) {
        notificationShown = true;
        alert(
          "⚠️ Nội dung được bảo vệ bản quyền. Vui lòng không sao chép hoặc chụp màn hình!",
        );
        setTimeout(() => {
          notificationShown = false;
        }, 3000);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F10") {
        e.preventDefault();
        showWarning();
        return false;
      }

      if (e.key === "PrintScreen") {
        e.preventDefault();
        showWarning();
        return false;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "x")) {
        e.preventDefault();
        showWarning();
        return false;
      }

      if (e.shiftKey && e.key === "S" && e.metaKey) {
        e.preventDefault();
        showWarning();
        return false;
      }

      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        e.preventDefault();
        showWarning();
        return false;
      }

      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        showWarning();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showWarning();
      return false;
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
    };
  }, []);

  return (
    <div
      className={`image-protection ${className || ""}`}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        position: "relative",
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};

export default ImageProtection;
