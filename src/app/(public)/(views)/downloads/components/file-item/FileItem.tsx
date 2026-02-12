"use client";
import {
  useGetApiFileId,
  useGetApiFileIdDownload,
  useGetApiFileDownloadFreeContentId,
} from "@/api/endpoints/files";
import { useGetApiContentId } from "@/api/endpoints/content";
import { OrderItem } from "@/api/models";
import { ResponseData } from "@/api/types/base";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { extractErrorMessage } from "@/utils/error";
import {
  downloadFile,
  getFileExtensionFromMimeType,
  getFileIcon,
} from "@/utils/file";
import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";
import Image from "@/components/ui/image";
import { CountdownButton } from "@/components/ui/countdown-button";

interface Props {
  orderId: string;
  item: OrderItem;
  index: number;
}

export const parseBlobError = async (error: any): Promise<string> => {
  const blob = error?.response?.data;

  if (blob instanceof Blob) {
    const text = await blob.text();
    try {
      const json = JSON.parse(text);
      return json.message ?? "Unknown error";
    } catch {
      return text;
    }
  }

  return "Unknown error";
};

const FileItem: FC<Props> = ({ orderId, item, index }) => {
  // States
  const [isError, setIsError] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const contentId = (item.contentId?._id ?? "") as unknown as string;

  const { data: contentData } = useGetApiContentId(contentId, {
    query: {
      enabled: !!item.contentId?._id,
    },
  });

  // Check if file is free
  const isFreeFile = contentData?.price === 0;

  // Mutations
  const downloadPaidFile = useGetApiFileIdDownload(
    orderId!,
    {
      fileId: contentData?.file_id?._id! as string,
    },
    {
      query: {
        enabled: false,
      },
    },
  );

  const downloadFreeFile = useGetApiFileDownloadFreeContentId(
    contentData?._id!,
    {
      query: {
        enabled: false,
      },
    },
  );

  // Methods
  const handleDownloadFile = async () => {
    try {
      let res;

      if (isFreeFile) {
        res = await downloadFreeFile.refetch();
      } else {
        res = await downloadPaidFile.refetch();
      }

      if (res.error) {
        const message = await parseBlobError(res?.error);

        console.log("Download file error response:", res);

        toast.error(message || "Tải tệp thất bại. Vui lòng thử lại sau.");
        setIsError(true);

        return;
      }

      if (!res.data) {
        toast.error("Tệp không tồn tại hoặc không thể tải xuống.");
        setIsError(true);
        return;
      }

      setIsDownloading(true);
      const extension = getFileExtensionFromMimeType(res.data.type);
      const fileName = `${contentData?.title || "tai-xuong"}${extension}`;
      downloadFile(res.data, fileName);
      toast.success("Tải file thành công");

      setIsDownloading(false);
      setIsError(false);
    } catch (error) {
      console.error("Download file error:", error);
      setIsError(true);
      toast.error(
        extractErrorMessage(error) || "Tải tệp thất bại. Vui lòng thử lại.",
      );
    }
  };

  const contentImage =
    contentData?.images && contentData.images.length > 0
      ? contentData.images[0]
      : undefined;

  const FileIcon = getFileIcon(contentData?.file_id?.type || "");

  return (
    <motion.div
      key={`file-item-${contentData?._id}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.6 + index * 0.1,
        duration: 0.4,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* File Icon */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.7 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {contentData?.images && contentData.images.length > 0 ? (
                    <Image
                      src={contentImage}
                      alt={contentData?.title || "File thumbnail"}
                      width={64}
                      height={64}
                    />
                  ) : (
                    <FileIcon />
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <motion.h3
                className="font-semibold text-base truncate mb-1"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {contentData?.title || "Unknown File"}
              </motion.h3>

              <motion.p
                className="font-semibold text-xs text-gray-500 mb-1 line-clamp-2"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {contentData?.description || "Unknown description"}
              </motion.p>

              <motion.div
                className="flex items-center gap-3 text-sm text-muted-foreground"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.75 + index * 0.1 }}
              >
                <span className="flex items-center gap-1">
                  {/* <Package className="h-3 w-3" /> */}
                  {contentData?.price} đ
                </span>
                <span className="flex items-center gap-1">
                  x {item.quantity}
                </span>
              </motion.div>
            </div>

            {/* Download Button */}
            <motion.div
              className="flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="gap-2"
                  disabled={isError || isDownloading}
                  onClick={handleDownloadFile}
                  loading={
                    (isFreeFile
                      ? downloadFreeFile.isFetching
                      : downloadPaidFile.isFetching) || isDownloading
                  }
                >
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </motion.div>
                  Tải xuống
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FileItem;
