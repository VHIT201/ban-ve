# useUploadMedia Hook

Custom hook chuyên nghiệp để upload media files lên server với đầy đủ tính năng tracking progress, error handling, và batch upload.

## 📋 Features

✅ **Single File Upload** - Upload từng file một với full control  
✅ **Batch Upload** - Upload nhiều files cùng lúc  
✅ **Preview Images** - Upload file chính kèm 4 preview images  
✅ **Progress Tracking** - Theo dõi tiến trình upload theo từng file  
✅ **Error Handling** - Xử lý lỗi chi tiết cho từng file  
✅ **TypeScript** - Full type-safe với TypeScript  
✅ **Clean Code** - Senior-level code organization

## 🚀 Installation

Hook đã có sẵn trong project, chỉ cần import:

```tsx
import { useUploadMedia } from "@/hooks";
```

## 📖 API Reference

### Return Values

```typescript
interface UseUploadMediaReturn {
  // State
  uploadProgress: Record<string, UploadProgress>;
  isUploading: boolean;

  // Methods
  uploadSingle: (
    file: File,
    options?: UploadOptions
  ) => Promise<ApiFile | null>;
  uploadMultiple: (
    files: File[],
    options?: UploadOptions
  ) => Promise<ApiFile[]>;
  uploadWithImages: (
    mainFile: File,
    images: File[],
    options?: UploadOptions
  ) => Promise<ApiFile | null>;

  // Helpers
  resetProgress: () => void;
  clearProgress: (fileName: string) => void;
}
```

### Upload Options

```typescript
interface UploadOptions {
  filename?: string; // Custom filename
  dir?: string; // Directory to store file
  private?: boolean; // Private file (requires auth)
  compress?: boolean; // Compress before upload
  requirePayment?: boolean; // Paid content
  expiresAfterDays?: number; // Auto-delete after X days
}
```

### Upload Progress

```typescript
interface UploadProgress {
  fileName: string;
  progress: number; // 0-100
  status: FileStatus; // 'pending' | 'success' | 'error'
  error?: string;
}
```

## 💡 Usage Examples

### 1. Basic Single Upload

```tsx
import { useUploadMedia } from "@/hooks";

function MyComponent() {
  const { uploadSingle, isUploading } = useUploadMedia();

  const handleUpload = async (file: File) => {
    const result = await uploadSingle(file);

    if (result) {
      console.log("Success! File ID:", result._id);
    }
  };

  return (
    <button onClick={() => handleUpload(file)} disabled={isUploading}>
      Upload
    </button>
  );
}
```

### 2. Upload with Options

```tsx
const { uploadSingle } = useUploadMedia();

const result = await uploadSingle(file, {
  filename: "custom-name.pdf",
  dir: "user-uploads",
  compress: true,
  requirePayment: true,
  private: false,
  expiresAfterDays: 30,
});
```

### 3. Multiple Files Upload

```tsx
const { uploadMultiple, uploadProgress } = useUploadMedia();

const handleUpload = async (files: File[]) => {
  const results = await uploadMultiple(files, {
    compress: true,
  });

  console.log(`Uploaded ${results.length} files`);
};

// Show progress for each file
Object.values(uploadProgress).map((progress) => (
  <div key={progress.fileName}>
    <span>{progress.fileName}</span>
    <Progress value={progress.progress} />
  </div>
));
```

### 4. Upload with Preview Images

```tsx
const { uploadWithImages } = useUploadMedia();

const handleUpload = async () => {
  const mainFile = getMainFile(); // 3D model, PDF, etc
  const previews = getPreviewImages(); // Array of images (max 4)

  const result = await uploadWithImages(mainFile, previews, {
    compress: true,
    requirePayment: true,
  });
};
```

### 5. Progress Tracking

```tsx
const { uploadSingle, uploadProgress, clearProgress } = useUploadMedia();

// Upload file
await uploadSingle(file);

// Access progress
const fileProgress = uploadProgress[file.name];
console.log(fileProgress.progress); // 0-100
console.log(fileProgress.status); // 'pending' | 'success' | 'error'

// Clear specific file progress
clearProgress(file.name);
```

### 6. Error Handling

```tsx
const { uploadSingle, uploadProgress } = useUploadMedia();

const result = await uploadSingle(file);

if (!result) {
  // Check error in progress
  const error = uploadProgress[file.name]?.error;
  alert(`Upload failed: ${error}`);
}
```

### 7. Complete Form Example

```tsx
function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const { uploadSingle, isUploading, uploadProgress, resetProgress } =
    useUploadMedia();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) return;

    resetProgress();

    const result = await uploadSingle(files[0], {
      compress: true,
      private: false,
    });

    if (result) {
      alert("Upload successful!");
      setFiles([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Uploader value={files} onChange={setFiles} maxFiles={1}>
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      {files[0] && uploadProgress[files[0].name] && (
        <div>
          <Progress value={uploadProgress[files[0].name].progress} />
          <p>Status: {uploadProgress[files[0].name].status}</p>
        </div>
      )}

      <button type="submit" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
}
```

## 🎯 Best Practices

### 1. Always Handle Errors

```tsx
const result = await uploadSingle(file);

if (!result) {
  // Handle error
  console.error("Upload failed");
}
```

### 2. Clear Progress After Success

```tsx
const result = await uploadSingle(file);

if (result) {
  setTimeout(() => clearProgress(file.name), 3000);
}
```

### 3. Reset Progress Before Batch Upload

```tsx
const handleBatchUpload = async (files: File[]) => {
  resetProgress(); // Clear previous uploads
  await uploadMultiple(files);
};
```

### 4. Validate Before Upload

```tsx
const handleUpload = async (file: File) => {
  // Validate file size
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    alert("File too large");
    return;
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("Only images allowed");
    return;
  }

  await uploadSingle(file);
};
```

### 5. Show Progress UI

```tsx
const progress = uploadProgress[file.name];

return (
  <div>
    <Progress value={progress?.progress ?? 0} />

    {progress?.status === "error" && (
      <p className="text-red-600">{progress.error}</p>
    )}

    {progress?.status === "success" && (
      <p className="text-green-600">Upload successful!</p>
    )}
  </div>
);
```

## 🔧 Advanced Usage

### Retry Failed Uploads

```tsx
const { uploadSingle, uploadProgress } = useUploadMedia();

const retryUpload = async (file: File) => {
  const currentProgress = uploadProgress[file.name];

  if (currentProgress?.status === "error") {
    await uploadSingle(file);
  }
};
```

### Upload Queue System

```tsx
const { uploadSingle } = useUploadMedia();

const uploadQueue = async (files: File[]) => {
  for (const file of files) {
    const result = await uploadSingle(file);

    if (!result) {
      console.error(`Failed to upload ${file.name}`);
      break; // Stop on first error
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay between uploads
  }
};
```

### Custom Progress Handler

```tsx
const { uploadSingle, uploadProgress } = useUploadMedia();

useEffect(() => {
  const fileName = "my-file.pdf";
  const progress = uploadProgress[fileName];

  if (progress) {
    console.log(`${fileName}: ${progress.progress}%`);

    if (progress.status === "success") {
      // Handle success
    } else if (progress.status === "error") {
      // Handle error
    }
  }
}, [uploadProgress]);
```

## 📊 Integration với Uploader Component

Hook này được thiết kế để hoạt động hoàn hảo với Uploader component:

```tsx
import Uploader, { FileWithPreview } from "@/components/shared/uploader";
import { useUploadMedia } from "@/hooks";

function MyUploadForm() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { uploadMultiple, uploadProgress } = useUploadMedia();

  const handleUpload = async () => {
    const results = await uploadMultiple(files);
    console.log("Uploaded files:", results);
  };

  return (
    <>
      <Uploader value={files} onChange={setFiles}>
        <Uploader.DropZone>
          <Uploader.Placeholder />
        </Uploader.DropZone>
        <Uploader.MediaList />
      </Uploader>

      <button onClick={handleUpload}>Upload All</button>
    </>
  );
}
```

## 🐛 Troubleshooting

### Upload không hoạt động?

- Kiểm tra user đã login chưa (yêu cầu quyền admin/collaborator)
- Kiểm tra file size không vượt quá limit
- Kiểm tra network connection

### Progress không update?

- Hook sử dụng state, đảm bảo component re-render
- Check `uploadProgress` object trong React DevTools

### Lỗi TypeScript?

- Đảm bảo đã import đúng types từ `@/api/models`
- Check `File` type conflict (browser File vs API File)

## 📚 Related

- [Uploader Component](../components/shared/uploader/README.md)
- [File Upload API](../api/endpoints/files.ts)
- [Examples](./use-upload-media.example.tsx)

## 📄 License

MIT
