/**
 * Examples: useUploadMedia Hook
 *
 * Các ví dụ sử dụng custom hook upload media
 */

import { useState } from "react";
import useUploadMedia from "./use-upload-media";
import Uploader, { FileWithPreview } from "@/components/shared/uploader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// ============================================
// Example 1: Basic Single File Upload
// ============================================
export function BasicUploadExample() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { uploadSingle, isUploading, uploadProgress } = useUploadMedia();

  const handleUpload = async () => {
    if (files.length === 0) return;

    const result = await uploadSingle(files?.[0] ?? null, {
      compress: true,
      private: false,
    });

    if (result) {
      console.log("Upload success:", result);
    }
  };

  return (
    <div className="space-y-4">
      <Uploader value={files} onChange={setFiles} maxFiles={1}>
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      <Button
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
      >
        {isUploading ? "Uploading..." : "Upload File"}
      </Button>

      {/* Show upload progress */}
      {Object.values(uploadProgress).map((progress) => (
        <div key={progress.fileName} className="space-y-2">
          <p className="text-sm">{progress.fileName}</p>
          <Progress value={progress.progress} />
          {progress.error && (
            <p className="text-sm text-red-600">{progress.error}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// Example 2: Multiple Files Upload
// ============================================
export function MultipleUploadExample() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { uploadMultiple, isUploading, uploadProgress, resetProgress } =
    useUploadMedia();

  const handleUpload = async () => {
    if (files.length === 0) return;

    resetProgress();
    const results = await uploadMultiple(files, {
      dir: "user-uploads",
      compress: true,
    });

    console.log("Upload results:", results);
  };

  return (
    <div className="space-y-4">
      <Uploader value={files} onChange={setFiles} maxFiles={10}>
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      <Button
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
      >
        Upload {files.length} file(s)
      </Button>

      {/* Progress for each file */}
      <div className="space-y-2">
        {Object.values(uploadProgress).map((progress) => (
          <div key={progress.fileName} className="rounded border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{progress.fileName}</span>
              <span className="text-xs text-gray-500">{progress.status}</span>
            </div>
            <Progress value={progress.progress} className="mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Example 3: Upload with Preview Images
// ============================================
export function UploadWithPreviewsExample() {
  const [mainFile, setMainFile] = useState<FileWithPreview[]>([]);
  const [previewImages, setPreviewImages] = useState<FileWithPreview[]>([]);
  const { uploadWithImages, isUploading, uploadProgress } = useUploadMedia();

  const handleUpload = async () => {
    if (mainFile.length === 0 || !mainFile[0]) return;

    const result = await uploadWithImages(mainFile[0], previewImages, {
      compress: true,
      requirePayment: true,
    });

    if (result) {
      console.log("Upload success with previews:", result);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main File */}
      <div>
        <h3 className="mb-2 font-medium">Main File (3D Model/PDF/etc)</h3>
        <Uploader value={mainFile} onChange={setMainFile} maxFiles={1}>
          <Uploader.DropZone>
            <Uploader.Placeholder />
          </Uploader.DropZone>
          <Uploader.MediaList />
        </Uploader>
      </div>

      {/* Preview Images */}
      <div>
        <h3 className="mb-2 font-medium">Preview Images (Max 4)</h3>
        <Uploader
          value={previewImages}
          onChange={setPreviewImages}
          maxFiles={4}
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
        >
          <Uploader.DropZone>
            <Uploader.Placeholder />
          </Uploader.DropZone>
          <Uploader.MediaList />
        </Uploader>
      </div>

      <Button
        onClick={handleUpload}
        disabled={isUploading || mainFile.length === 0}
      >
        {isUploading ? "Uploading..." : "Upload with Previews"}
      </Button>

      {/* Progress */}
      {Object.values(uploadProgress).map((progress) => (
        <div key={progress.fileName} className="rounded border p-3">
          <p className="text-sm font-medium">{progress.fileName}</p>
          <Progress value={progress.progress} className="mt-2" />
          <p className="mt-1 text-xs text-gray-500">
            Status: {progress.status}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Example 4: Upload with Advanced Options
// ============================================
export function AdvancedUploadExample() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { uploadSingle, isUploading, uploadProgress } = useUploadMedia();

  const handleUpload = async (options: {
    private: boolean;
    requirePayment: boolean;
  }) => {
    if (files.length === 0) return;

    const result = await uploadSingle(files?.[0] ?? null, {
      filename: `custom-name-${Date.now()}`,
      dir: "premium-content",
      compress: true,
      expiresAfterDays: 30,
      ...options,
    });

    if (result) {
      console.log("Upload success:", result);
    }
  };

  return (
    <div className="space-y-4">
      <Uploader value={files} onChange={setFiles} maxFiles={1}>
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      <div className="flex gap-2">
        <Button
          onClick={() =>
            handleUpload({ private: false, requirePayment: false })
          }
          disabled={isUploading}
        >
          Upload as Public Free
        </Button>
        <Button
          onClick={() => handleUpload({ private: false, requirePayment: true })}
          disabled={isUploading}
          variant="outline"
        >
          Upload as Public Paid
        </Button>
        <Button
          onClick={() => handleUpload({ private: true, requirePayment: false })}
          disabled={isUploading}
          variant="secondary"
        >
          Upload as Private
        </Button>
      </div>

      {Object.values(uploadProgress).map((progress) => (
        <div key={progress.fileName}>
          <Progress value={progress.progress} />
        </div>
      ))}
    </div>
  );
}

// ============================================
// Example 5: Complete Form with Upload
// ============================================
export function CompleteFormExample() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    private: false,
    requirePayment: false,
  });

  const { uploadSingle, isUploading, uploadProgress, clearProgress } =
    useUploadMedia();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please select a file");
      return;
    }

    const result = await uploadSingle(files?.[0] ?? null, {
      filename: formData.title,
      private: formData.private,
      requirePayment: formData.requirePayment,
      compress: true,
    });

    if (result) {
      // Reset form
      setFiles([]);
      setFormData({
        title: "",
        description: "",
        private: false,
        requirePayment: false,
      });
      clearProgress(files?.[0]?.name ?? "");

      alert("Upload successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="mt-1 w-full rounded border p-2"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.private}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, private: e.target.checked }))
            }
          />
          <span className="text-sm">Private</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.requirePayment}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                requirePayment: e.target.checked,
              }))
            }
          />
          <span className="text-sm">Require Payment</span>
        </label>
      </div>

      <Uploader value={files} onChange={setFiles} maxFiles={1}>
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      {Object.values(uploadProgress).map((progress) => (
        <div key={progress.fileName} className="rounded border p-3">
          <p className="text-sm">{progress.fileName}</p>
          <Progress value={progress.progress} className="mt-2" />
        </div>
      ))}

      <Button type="submit" disabled={isUploading || files.length === 0}>
        {isUploading ? "Uploading..." : "Submit"}
      </Button>
    </form>
  );
}
