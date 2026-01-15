// Core
import { FC, useCallback, useMemo, ReactNode } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { assign } from "lodash-es";

// Internal
import {
  UPLOADER_CONTEXT,
  DEFAULT_MAX_FILES,
  DEFAULT_MAX_SIZE,
  DEFAULT_ACCEPT,
} from "./lib/constants";
import { FileStatus, UploaderProps } from "./lib/types";
import { createFileWithPreview } from "./lib/utils";
import UploaderDropZone from "./components/uploader-drop-zone";
import UploaderMediaList from "./components/uploader-media-list";
import UploaderPlaceholder from "./components/uploader-placeholder";

interface UploaderRootProps extends UploaderProps {
  children: ReactNode;
}

const Uploader: FC<UploaderRootProps> = (props) => {
  // Props
  const {
    multiple = false,
    maxFiles = DEFAULT_MAX_FILES,
    maxSize = DEFAULT_MAX_SIZE,
    accept = DEFAULT_ACCEPT,
    value = [],
    onChange,
    children,
  } = props;

  // Hooks
  const dropZoneStates = useDropzone({
    multiple,
    accept,
    maxSize,
    maxFiles,
    onDrop: useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const availableSlots = maxFiles - value.length;
        if (availableSlots <= 0) return;

        const validAcceptedFiles = acceptedFiles.slice(0, availableSlots);

        const newRejectedFiles = rejectedFiles.map(({ file, errors }) =>
          createFileWithPreview(
            file,
            FileStatus.ERROR,
            errors[0]?.message || "File rejected"
          )
        );

        const newAcceptedFiles = validAcceptedFiles.map((file) =>
          createFileWithPreview(file, FileStatus.PENDING)
        );

        onChange?.([...value, ...newAcceptedFiles, ...newRejectedFiles]);
      },
      [value, maxFiles, onChange]
    ),
  });

  // Methods
  const handleAddFiles = useCallback(
    (newFile: File) => {
      if (value.length >= maxFiles) return;

      const fileWithPreview = createFileWithPreview(
        newFile,
        FileStatus.PENDING
      );
      const updatedFileList = multiple
        ? [...value, fileWithPreview]
        : [fileWithPreview];

      onChange?.(updatedFileList);
    },
    [value, maxFiles, onChange]
  );

  const handleDeleteFile = useCallback(
    (fileName: string) => {
      const updatedFileList = value.filter((file) => file.name !== fileName);
      onChange?.(updatedFileList);
    },
    [value, onChange]
  );

  // Context value
  const contextValue = useMemo(
    () => ({
      // Props
      accept,
      maxSize,
      maxFiles,
      multiple,
      fileList: value,
      dropZoneStates,

      // Actions
      handleAddFiles,
      handleDeleteFile,
    }),
    [
      multiple,
      accept,
      maxSize,
      maxFiles,
      value,
      dropZoneStates,
      handleAddFiles,
      handleDeleteFile,
    ]
  );

  return (
    <UPLOADER_CONTEXT.Provider value={contextValue}>
      <div className="space-y-4">{children}</div>
    </UPLOADER_CONTEXT.Provider>
  );
};

export default assign(Uploader, {
  DropZone: UploaderDropZone,
  MediaList: UploaderMediaList,
  Placeholder: UploaderPlaceholder,
});
