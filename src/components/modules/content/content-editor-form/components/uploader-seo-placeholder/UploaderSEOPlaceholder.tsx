import { useDeleteApiFileId } from "@/api/endpoints/files";
import { useUploaderContext } from "@/components/shared/uploader";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { extractErrorMessage } from "@/utils/error";
import { PlusIcon, XIcon } from "lucide-react";
import { FC, Fragment, useState } from "react";
import { toast } from "sonner";

interface Props {
  file?: {
    id: string;
    name: string;
    path: string;
  };
}

const UploaderSEOPlaceholder: FC<Props> = (props) => {
  const { file } = props;
  // States
  const [deleteFile, setDeleteFile] = useState<null | {
    id: string;
    name: string;
  }>(null);

  // Hooks
  const { fileList, handleDeleteFile } = useUploaderContext();

  // Mutations
  const deleteFileMutation = useDeleteApiFileId();

  // Methods
  const handleRemoveImage = async () => {
    if (fileList.length > 0) {
      handleDeleteFile(fileList[0]?.name || "");
    } else if (file) {
      try {
        await deleteFileMutation.mutateAsync({ id: file.id });
        setDeleteFile(file);
        toast.success("Xóa file thành công");
      } catch (error) {
        toast.error(extractErrorMessage(error) || "Xóa file thất bại");
      }
    }
  };

  // Memos
  const hasImage = !!file || fileList.length > 0;
  const seoImageSrc = fileList.length > 0 ? fileList[0]?.preview : file?.path;

  return (
    <div className="h-full w-full flex items-center relative group">
      {hasImage ? (
        <Fragment>
          <Button
            type="button"
            size="icon"
            loading={deleteFileMutation.isPending}
            variant="destructive"
            className="absolute top-1 right-1 size-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemoveImage}
          >
            <XIcon className="w-4 h-4" />
          </Button>
          <Image
            src={seoImageSrc}
            alt="SEO Image"
            className="h-full w-full object-cover"
          />
        </Fragment>
      ) : (
        <div className="flex items-center justify-center h-full w-full size-16">
          <PlusIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default UploaderSEOPlaceholder;
