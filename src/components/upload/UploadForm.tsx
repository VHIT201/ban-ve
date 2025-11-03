import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Upload, X, CheckCircle, XCircle } from 'lucide-react';
import { UploadFormData, SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from '@/types/upload';
import { toast } from 'sonner';

interface UploadFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export function UploadForm({ onSubmit, isSubmitting }: UploadFormProps) {
  const [formData, setFormData] = useState<UploadFormData>({
    file: null,
    title: '',
    description: '',
    category: '',
    tags: '',
    isPaid: false,
    price: 0,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Validate file type
      const isValidType = Object.entries(SUPPORTED_FILE_TYPES).some(([mime, exts]) => 
        exts.some(ext => file.name.toLowerCase().endsWith(ext))
      );
      
      if (!isValidType) {
        toast.error('Định dạng tệp không được hỗ trợ');
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Kích thước tệp quá lớn. Tối đa cho phép: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }

      setFormData(prev => ({ ...prev, file }));
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }

      // Auto-fill title if empty
      if (!formData.title) {
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        setFormData(prev => ({
          ...prev,
          title: fileNameWithoutExt,
          file,
        }));
      } else {
        setFormData(prev => ({ ...prev, file }));
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Object.fromEntries(
      Object.entries(SUPPORTED_FILE_TYPES).map(([mime, exts]) => [mime, exts])
    ),
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      toast.error('Vui lòng chọn tệp để tải lên');
      return;
    }

    const data = new FormData();
    data.append('file', formData.file);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('tags', formData.tags);
    data.append('isPaid', String(formData.isPaid));
    if (formData.isPaid && formData.price) {
      data.append('price', formData.price.toString());
    }

    await onSubmit(data);
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Tải lên nội dung mới</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div>
          <Label htmlFor="file-upload">Tệp đính kèm *</Label>
          {!formData.file ? (
            <div
              {...getRootProps()}
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>Tải lên tệp</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      ref={fileInputRef}
                      onChange={(e) => e.target.files && onDrop(Array.from(e.target.files))}
                    />
                  </label>
                  <p className="pl-1">hoặc kéo thả vào đây</p>
                </div>
                <p className="text-xs text-gray-500">
                  Hỗ trợ: {Object.values(SUPPORTED_FILE_TYPES).flat().join(', ')} (tối đa 500MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-1 flex items-center justify-between p-4 border border-gray-300 rounded-md">
              <div className="flex items-center space-x-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-xs">
                      {formData.file.name.split('.').pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {formData.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="Nhập tiêu đề"
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            placeholder="Mô tả chi tiết về nội dung của bạn"
            className="mt-1"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="block text-sm font-medium text-gray-700">Lĩnh vực *</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-input bg-background rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Chọn lĩnh vực</option>
            <option value="architecture">Kiến trúc</option>
            <option value="interior">Nội thất</option>
            <option value="landscape">Cảnh quan</option>
            <option value="construction">Xây dựng</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags" className="block text-sm font-medium text-gray-700">Thẻ (cách nhau bằng dấu phẩy)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Ví dụ: nhà phố, hiện đại, 3 tầng"
            className="mt-1"
          />
        </div>

        {/* Paid Content Toggle */}
        <div className="flex items-center space-x-3 pt-1">
          <Switch
            id="isPaid"
            checked={formData.isPaid}
            onCheckedChange={(checked) => setFormData({ ...formData, isPaid: checked })}
          />
          <Label htmlFor="isPaid">Nội dung trả phí</Label>
        </div>

        {/* Price (conditionally rendered) */}
        {formData.isPaid && (
          <div className="space-y-2">
            <Label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá (VND) *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.price || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value) || 0,
                })
              }
              required
              placeholder="Nhập giá"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full flex justify-center items-center"
            disabled={isSubmitting || !formData.file}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tải lên...
              </>
            ) : (
              'Gửi để phê duyệt'
            )}
          </Button>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Nội dung của bạn sẽ được kiểm duyệt trước khi hiển thị công khai.
          </p>
        </div>
      </form>
    </div>
  );
}
