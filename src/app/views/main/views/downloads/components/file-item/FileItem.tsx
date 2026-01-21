import {
  useGetApiFileId,
  useGetApiFileIdDownload,
} from "@/api/endpoints/files";
import { OrderItem } from "@/api/models";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { extractErrorMessage } from "@/utils/error";
import { downloadFile, getFileIcon } from "@/utils/file";
import { motion } from "framer-motion";
import { DownloadIcon, FileText } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  orderId: string;
  item: OrderItem;
  index: number;
}

const FileItem: FC<Props> = ({ orderId, item, index }) => {
  // States
  const [isError, setIsError] = useState<boolean>(false);

  // Mutations
  const downloadFileMutation = useGetApiFileIdDownload(
    orderId!,
    {
      fileId: item.contentId?.file_id!,
    },
    {
      query: {
        enabled: false,
      },
    },
  );

  // Methods
  const handleDownloadFile = async () => {
    try {
      const res = await downloadFileMutation.refetch();

      if (res.error) {
        toast.error("Tải tệp thất bại. Vui lòng thử lại.");
        setIsError(true);
        return;
      }

      if (!res.data) {
        toast.error("Tệp không tồn tại hoặc không thể tải xuống.");
        setIsError(true);
        return;
      }

      downloadFile(res.data, item.contentId?.title || "downloaded-file");
      toast.success("Tải file thành công");
      setIsError(false);
    } catch (error) {
      setIsError(true);
      toast.error(
        extractErrorMessage(error) || "Tải tệp thất bại. Vui lòng thử lại.",
      );
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Bạn đã đạt giới hạn tải xuống (5 lần) cho đơn hàng này.");
    }
  }, [isError]);

  // Memos
  const FileIcon = getFileIcon("PDF");

  return (
    <motion.div
      key={`file-item-${item.contentId?._id}-${index}`}
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
                  <FileIcon />
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
                {item.contentId?.title || "Unknown File"}
              </motion.h3>

              <motion.p
                className="font-semibold text-xs text-gray-500 mb-1 line-clamp-2"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {item.contentId?.description || "Unknown description"}
              </motion.p>

              <motion.div
                className="flex items-center gap-3 text-sm text-muted-foreground"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.75 + index * 0.1 }}
              >
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  PDF
                </span>
                <span className="flex items-center gap-1">
                  {/* <Package className="h-3 w-3" /> */}
                  {item.contentId?.price} đ
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
                  disabled={isError}
                  onClick={handleDownloadFile}
                  loading={downloadFileMutation.isFetching}
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
