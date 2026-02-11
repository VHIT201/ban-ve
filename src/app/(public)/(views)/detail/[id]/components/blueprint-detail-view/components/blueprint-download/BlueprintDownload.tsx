import {
  useGetApiFileDownloadFreeContentId,
  useGetApiFileIdDownload,
} from "@/api/endpoints/files";
import { Content } from "@/api/models";
import { Button } from "@/components/ui/button";
import { useCountDown } from "@/hooks";
import { extractErrorMessage } from "@/utils/error";
import { downloadFile, getFileExtensionFromMimeType } from "@/utils/file";
import { Clock, CheckCircle, Sparkles, DownloadIcon } from "lucide-react";
import { FC, useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  content: Content;
}

const BlueprintDownload: FC<Props> = ({ content }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHover, setIsHover] = useState(false);
const isFree = content.price === 0 || content.price === undefined;
  // Countdown với tự động bắt đầu khi download thành công
  const countdown = useCountDown({
    seconds: 30,
    autoStart: false,
    onFinish: () => {
      setIsSuccess(false);
    },
  });

  // Queries
  const getDownloadFileQuery = useGetApiFileIdDownload(
    content.file_id?._id || "",
    {},
    {
      query: {
        enabled: false,
      },
    },
  );

  const getFreeDownloadQuery = useGetApiFileDownloadFreeContentId(
    content._id || "",
    {
      query: {
        enabled: false,
      },
    },
  );

  // Hiệu ứng thành công tự động tắt sau 3s
  useEffect(() => {
    if (isSuccess && !countdown.isRunning) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, countdown.isRunning]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      if (!content.file_id?._id) {
        toast.error("File không tồn tại");
        return;
      }

      // File miễn phí
      if (content.price === 0 || content.price === undefined) {
        const res = await getFreeDownloadQuery.refetch();

        if (res.error) {
          toast.error(extractErrorMessage(res.error) || "Tải file thất bại");
          setIsDownloading(false);
          return;
        }

        if (res.data) {
          // Lấy extension đúng từ MIME type
          const extension = getFileExtensionFromMimeType(res.data.type);
          const fileName = `${content.title || "tai-xuong"}${extension}`;
          downloadFile(res.data, fileName);

          toast.success("Đã tải file miễn phí thành công");
          setIsSuccess(true);
          countdown.start(); // Bắt đầu countdown sau khi download thành công
          return;
        }
      }

      // File có phí
      const res = await getDownloadFileQuery.refetch();

      if (res.isError) {
        const error = res.error as any;
        if (error?.status === 402) {
          toast.warning("Bạn cần mua sản phẩm để tải file");
        } else {
          toast.error("Có lỗi xảy ra khi tải file");
        }
        setIsDownloading(false);
        return;
      }

      if (res.data) {
        // Lấy extension đúng từ MIME type
        const extension = getFileExtensionFromMimeType(res.data.type);
        const fileName = `${content.title || "tai-xuong"}${extension}`;
        downloadFile(res.data, fileName);

        toast.success("Đã tải file xuống thành công");
        setIsSuccess(true);
        countdown.start();
        return;
      }
    } catch (error) {
      toast.error(extractErrorMessage(error));
      setIsDownloading(false);
    } finally {
      setIsDownloading(false);
    }
  };

  const isLoading =
    content.price === 0 || content.price === undefined
      ? getFreeDownloadQuery.isLoading || isDownloading
      : getDownloadFileQuery.isLoading || isDownloading;

  // Xác định trạng thái nút
  const getButtonState = () => {
    if (isSuccess && countdown.isRunning) {
      return "success";
    }
    if (isLoading) {
      return "loading";
    }
    return "default";
  };

  const buttonState = getButtonState();

  return (
    <>
      {isFree && (
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
        >
      {/* Hiệu ứng nền lấp lánh khi hover */}
      <AnimatePresence>
        {isHover && !isLoading && buttonState !== "success" && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/50 to-purple-500/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Container chính */}
      <div className="relative overflow-hidden rounded-none border bg-gradient-to-br from-white to-gray-50 shadow-sm transition-all duration-300">
        {/* Hiệu ứng progress khi loading */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gray-400 to-gray-700"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Nội dung chính */}
        <div className="p-4">
          {/* Header với icon và thông tin */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">Tải xuống file</h3>
                <p className="text-sm text-gray-500">
                  {content.price === 0 || content.price === undefined
                    ? "Miễn phí"
                    : "Có phí"}
                </p>
              </div>
            </div>

            {/* Hiển thị countdown khi active */}
            <AnimatePresence>
              {countdown.isRunning && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1"
                >
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {countdown.timeLeft}s
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nút download chính */}
          
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              variant={buttonState === "success" ? "default" : "default"} 
              size="lg"
              className="relative w-full gap-2 overflow-hidden bg-primary !text-white hover:bg-primary/90 disabled:bg-primary/60 disabled:!text-white disabled:!opacity-100 [&_svg]:!text-white"
              onClick={handleDownload}
              disabled={isLoading || !content.file_id?._id}
            >
              <AnimatePresence mode="wait">
                {buttonState === "loading" ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                    />
                    <span>Đang tải xuống...</span>
                  </motion.div>
                ) : buttonState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Đã tải xuống!</span>
                    {countdown.isRunning && (
                      <span className="text-sm opacity-90">
                        ({countdown.timeLeft}s)
                      </span>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <DownloadIcon className="h-5 w-5" />
                    <span>Tải file xuống</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Thông tin bổ sung */}
          <AnimatePresence>
            {countdown.isRunning && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-primary">
                      Bạn có thể tải lại sau {countdown.timeLeft} giây
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thông tin file */}
          <motion.div
            className="mt-3 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {content.file_id?.name && (
              <p className="truncate">Tên file: {content.file_id.name}</p>
            )}
          </motion.div>
        </div>
      </div>
        </motion.div>
      )}
    </>
  );
};

export default BlueprintDownload;
