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

// ============================================
// Example 6: Upload with Watermark
// ============================================
export function UploadWithWatermarkExample() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { uploadSingle, isUploading, uploadProgress } = useUploadMedia();

  const handleUploadWithWatermark = async () => {
    if (files.length === 0) return;

    const result = await uploadSingle(files?.[0] ?? null, {
      applyWatermark: true, // Enable watermark
      watermarkOptions: {
        text: "TẠO BỞI DATA - DATAORY",
        fontSize: 36,
        textOpacity: 0.7,
        overlayOpacity: 0.4,
        enableOverlay: true,
      },
      compress: true,
      dir: "watermarked",
    });

    if (result) {
      console.log("Upload with watermark success:", result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Upload with Watermark</h3>

      <Uploader
        value={files}
        onChange={setFiles}
        maxFiles={1}
        accept={{ "image/*": [] }}
      >
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      <Button
        onClick={handleUploadWithWatermark}
        disabled={isUploading || files.length === 0}
      >
        {isUploading
          ? "Adding Watermark & Uploading..."
          : "Upload with Watermark"}
      </Button>

      {Object.values(uploadProgress).map((progress) => (
        <div key={progress.fileName} className="rounded border p-3">
          <p className="text-sm">{progress.fileName}</p>
          <Progress value={progress.progress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {progress.progress < 25 && "Applying watermark..."}
            {progress.progress >= 25 &&
              progress.progress < 50 &&
              "Uploading..."}
            {progress.progress >= 50 &&
              progress.progress < 100 &&
              "Processing..."}
            {progress.progress === 100 && "Complete!"}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Example 7: Upload with Custom Watermark
// ============================================
export function CustomWatermarkExample() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [watermarkText, setWatermarkText] = useState("CUSTOM WATERMARK");
  const { uploadSingle, isUploading, uploadProgress } = useUploadMedia();

  const handleUploadCustom = async () => {
    if (files.length === 0) return;

    const result = await uploadSingle(files?.[0] ?? null, {
      applyWatermark: true,
      watermarkOptions: {
        text: watermarkText,
        fontSize: 28,
        textOpacity: 0.8,
        rotation: -Math.PI / 4, // -45 degrees
        overlayOpacity: 0.3,
        enableOverlay: true,
        fontWeight: "bold",
      },
      dir: "custom-watermark",
    });

    if (result) {
      console.log("Custom watermark upload success:", result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Watermark</h3>

      <div>
        <label className="text-sm font-medium">Watermark Text</label>
        <input
          type="text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="Enter watermark text"
        />
      </div>

      <Uploader
        value={files}
        onChange={setFiles}
        maxFiles={1}
        accept={{ "image/*": [] }}
      >
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      <Button
        onClick={handleUploadCustom}
        disabled={isUploading || files.length === 0}
      >
        Upload with Custom Watermark
      </Button>

      {Object.values(uploadProgress).map((progress) => (
        <div key={progress.fileName} className="rounded border p-3">
          <p className="text-sm">{progress.fileName}</p>
          <Progress value={progress.progress} className="mt-2" />
        </div>
      ))}
    </div>
  );
}

// ============================================
// Example 8: Upload Multiple Images with Watermark
// ============================================
export function MultipleWatermarkExample() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { uploadMultiple, isUploading, uploadProgress } = useUploadMedia();

  const handleUploadMultiple = async () => {
    if (files.length === 0) return;

    const results = await uploadMultiple(files, {
      applyWatermark: true,
      watermarkOptions: {
        text: "BANVE.VN",
        fontSize: 20,
        overlayOpacity: 0.4,
      },
      compress: true,
      dir: "gallery",
    });

    console.log(`Uploaded ${results.length} files with watermark`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Upload Multiple with Watermark</h3>

      <Uploader
        value={files}
        onChange={setFiles}
        maxFiles={10}
        accept={{ "image/*": [] }}
      >
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      <Button
        onClick={handleUploadMultiple}
        disabled={isUploading || files.length === 0}
      >
        {isUploading
          ? `Uploading ${Object.keys(uploadProgress).length} files...`
          : `Upload ${files.length} files with Watermark`}
      </Button>

      <div className="space-y-2">
        {Object.values(uploadProgress).map((progress) => (
          <div key={progress.fileName} className="rounded border p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{progress.fileName}</p>
              <span className="text-sm text-muted-foreground">
                {progress.progress}%
              </span>
            </div>
            <Progress value={progress.progress} className="mt-2" />
            {progress.error && (
              <p className="mt-1 text-xs text-red-500">{progress.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Example 9: Upload with Preview Images (All Watermarked)
// ============================================
export function WatermarkedPreviewsExample() {
  const [mainFile, setMainFile] = useState<FileWithPreview[]>([]);
  const [previewFiles, setPreviewFiles] = useState<FileWithPreview[]>([]);
  const { uploadWithImages, isUploading, uploadProgress } = useUploadMedia();

  const handleUploadWithPreviews = async () => {
    if (mainFile.length === 0 || !mainFile[0]) return;

    const result = await uploadWithImages(
      mainFile[0]! as unknown as File,
      previewFiles.slice(0, 4) as unknown as File[], // Max 4 preview images
      {
        applyWatermark: true,
        watermarkOptions: {
          text: "TẠO BỞI DATA - DATAORY",
          fontSize: 36,
          textOpacity: 0.7,
          overlayOpacity: 0.4,
          enableOverlay: true,
        },
        requirePayment: true,
        dir: "premium",
      },
    );

    if (result) {
      console.log("Upload with watermarked previews success:", result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Upload with Watermarked Preview Images
      </h3>

      <div>
        <label className="text-sm font-medium">Main File</label>
        <Uploader
          value={mainFile}
          onChange={setMainFile}
          maxFiles={1}
          accept={{ "image/*": [], "application/pdf": [] }}
        >
          <Uploader.DropZone>
            <Uploader.Placeholder />
          </Uploader.DropZone>
          <Uploader.MediaList />
        </Uploader>
      </div>

      <div>
        <label className="text-sm font-medium">
          Preview Images (Max 4, all will be watermarked)
        </label>
        <Uploader
          value={previewFiles}
          onChange={setPreviewFiles}
          maxFiles={4}
          accept={{ "image/*": [] }}
        >
          <Uploader.DropZone>
            <Uploader.Placeholder />
          </Uploader.DropZone>
          <Uploader.MediaList />
        </Uploader>
      </div>

      <Button
        onClick={handleUploadWithPreviews}
        disabled={isUploading || mainFile.length === 0}
      >
        {isUploading
          ? "Processing & Uploading..."
          : "Upload with Watermarked Previews"}
      </Button>

      {Object.values(uploadProgress).map((progress) => (
        <div key={progress.fileName} className="rounded border p-3">
          <p className="text-sm">{progress.fileName}</p>
          <Progress value={progress.progress} className="mt-2" />
        </div>
      ))}
    </div>
  );
}

/**
 * WATERMARK OPTIONS REFERENCE
 * ============================
 *
 * Upload Options:
 * - applyWatermark: boolean - Enable/disable watermark
 * - watermarkOptions: UseWatermarkOptions - Custom watermark configuration
 *
 * Watermark Options:
 * - text: string - Watermark text (default: "TẠO BỞI DATA - DATAORY")
 * - rotation: number - Rotation in radians (default: -Math.PI / 6)
 * - overlayOpacity: number - Overlay opacity 0-1 (default: 0.5)
 * - textOpacity: number - Text opacity 0-1 (default: 0.7)
 * - fontSize: number - Font size in px (default: 22)
 * - fontFamily: string - Font family (default: "Arial")
 * - fontWeight: string - Font weight (default: "bold")
 * - spacingX: number - Horizontal spacing (default: 200)
 * - spacingY: number - Vertical spacing (default: 150)
 * - overlayColor: string - Custom overlay color
 * - textColor: string - Custom text color
 * - enableOverlay: boolean - Enable/disable overlay (default: true)
 */
