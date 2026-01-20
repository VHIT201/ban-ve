import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetApiOrdersOrderId } from "@/api/endpoints/orders";
import type { Order } from "@/api/models/order";

export interface DownloadFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  contentId: string;
}

export interface UseDownloadOrderReturn {
  order: Order | undefined;
  files: DownloadFile[];
  isLoading: boolean;
  isError: boolean;
  isExpired: boolean;
  isNotFound: boolean;
  isNotCompleted: boolean;
  hasNoFiles: boolean;
  orderCode: string | null;
  downloadFile: (fileId: string) => Promise<void>;
  downloadAllFiles: () => Promise<void>;
}

/**
 * Custom hook to manage download page data and actions
 */
export function useDownloadOrder(): UseDownloadOrderReturn {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(
    new Set(),
  );

  // Fetch order data
  // NOTE: This assumes the API accepts orderCode as the ID parameter
  // You may need to create a specific endpoint: /api/orders/by-code/:orderCode
  const { data, isLoading, error } = useGetApiOrdersOrderId(orderCode || "", {
    query: {
      enabled: !!orderCode,
    },
  });

  const order = data?.data as Order | undefined;

  // Compute states
  const isExpired = order?.expiresAt
    ? new Date(order.expiresAt) < new Date()
    : false;
  const isNotFound = !!error || (!isLoading && !order);
  const isNotCompleted = order?.status !== "completed";
  const hasNoFiles = !order?.items || order.items.length === 0;
  const isError = !!error;

  // Transform order items to downloadable files
  const files: DownloadFile[] =
    order?.items?.map((item, index) => ({
      id: item.contentId || `file-${index}`,
      name: `File ${index + 1}`, // Replace with actual file name from content
      type: "application/pdf", // Replace with actual file type
      size: 0, // Replace with actual file size
      url: "", // Replace with actual download URL
      contentId: item.contentId || "",
    })) || [];

  /**
   * Download a single file
   */
  const downloadFile = async (fileId: string): Promise<void> => {
    const file = files.find((f) => f.id === fileId);
    if (!file) {
      console.error("File not found:", fileId);
      return;
    }

    setDownloadingFiles((prev) => new Set(prev).add(fileId));

    try {
      // TODO: Implement actual download logic
      // This should:
      // 1. Fetch a secure download URL from the backend
      // 2. Create a temporary link and trigger download
      // 3. Handle errors appropriately

      // Example implementation:
      // const response = await fetch(file.url);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = file.name;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
      // document.body.removeChild(a);

      console.log("Downloading file:", file);

      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to download file:", error);
      // TODO: Show error toast/notification
    } finally {
      setDownloadingFiles((prev) => {
        const next = new Set(prev);
        next.delete(fileId);
        return next;
      });
    }
  };

  /**
   * Download all files
   */
  const downloadAllFiles = async (): Promise<void> => {
    try {
      // TODO: Implement download all logic
      // Options:
      // 1. Download files sequentially
      // 2. Create a ZIP file on the backend and download that
      // 3. Use a download manager library

      // Example: Sequential downloads
      for (const file of files) {
        await downloadFile(file.id);
      }

      console.log("Downloading all files:", files);
    } catch (error) {
      console.error("Failed to download all files:", error);
      // TODO: Show error toast/notification
    }
  };

  return {
    order,
    files,
    isLoading,
    isError,
    isExpired,
    isNotFound,
    isNotCompleted,
    hasNoFiles,
    orderCode,
    downloadFile,
    downloadAllFiles,
  };
}
