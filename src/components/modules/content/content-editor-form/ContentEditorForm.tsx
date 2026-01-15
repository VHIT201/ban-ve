// Core
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// App
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useGetApiCategories } from "@/api/endpoints/categories";
import { Loader2, DollarSign, AlertCircle, X } from "lucide-react";
import { ResponseData } from "@/api/types/base";
import { Category } from "@/api/models";
import { Uploader } from "@/components/shared";
import { useUploadMedia } from "@/hooks";

// Schema validation
const contentFormSchema = z
  .object({
    title: z
      .string()
      .min(3, "Tiêu đề phải có ít nhất 3 ký tự")
      .max(200, "Tiêu đề không được vượt quá 200 ký tự"),
    description: z
      .string()
      .min(10, "Mô tả phải có ít nhất 10 ký tự")
      .max(1000, "Mô tả không được vượt quá 1000 ký tự"),
    category_id: z.string().min(1, "Vui lòng chọn danh mục"),
    price: z
      .number({
        required_error: "Vui lòng nhập giá",
        invalid_type_error: "Giá phải là số",
      })
      .min(0, "Giá không được âm")
      .max(1000000000, "Giá không được vượt quá 1 tỷ VNĐ"),
    files: z
      .array(z.instanceof(File))
      .min(1, "Vui lòng chọn ít nhất 1 file")
      .max(1, "Chỉ được chọn 1 file")
      .refine(
        (files) => files.every((file) => file.size <= 50 * 1024 * 1024),
        "Kích thước file không được vượt quá 50MB"
      )
      .refine((files) => {
        const validTypes = [
          "application/pdf",
          "application/acad",
          "application/x-acad",
          "application/autocad_dwg",
          "image/x-dwg",
          "application/dwg",
          "application/x-dwg",
          "application/x-autocad",
          "image/vnd.dwg",
          "drawing/dwg",
        ];
        return files.every(
          (file) => validTypes.includes(file.type) || file.name.endsWith(".dwg")
        );
      }, "Chỉ chấp nhận file PDF hoặc DWG")
      .optional(),
    content_file: z
      .object({
        _id: z.string(),
        name: z.string(),
        type: z.string(),
        size: z.number(),
      })
      .optional(),
  })
  .refine(
    (data) =>
      (data.files && data.files.length > 0) || data.content_file !== undefined,
    {
      message: "Vui lòng chọn file hoặc giữ file hiện tại",
      path: ["files"],
    }
  );

export type ContentFormValues = z.infer<typeof contentFormSchema>;

interface ContentEditorFormProps {
  mode?: "create" | "edit";
  defaultValues?: Partial<ContentFormValues>;
  onSubmit: (values: ContentFormValues) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onCancel?: () => void;
}

const ContentEditorForm = ({
  mode = "create",
  defaultValues,
  onSubmit,
  isLoading = false,
  error = null,
  onCancel,
}: ContentEditorFormProps) => {
  // Fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetApiCategories({
      query: {
        select: (data) =>
          (data as unknown as ResponseData<{ categories: Category[] }>).data
            .categories,
      },
    });

  const categories = useMemo(() => categoriesData || [], [categoriesData]);

  // Upload media hook
  const {
    uploadSingle,
    uploadProgress,
    isUploading: isUploadingFile,
  } = useUploadMedia();
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Initialize form
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      category_id: defaultValues?.category_id || "",
      price: defaultValues?.price || 0,
      files: defaultValues?.files || [],
      content_file: defaultValues?.content_file,
    },
  });

  // Watch file changes
  const selectedFiles = form.watch("files");
  const contentFile = form.watch("content_file");

  // Get upload progress for current file
  const currentFileProgress = selectedFiles?.[0]
    ? uploadProgress[selectedFiles[0].name]
    : null;

  // Reset form when mode changes
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title || "",
        description: defaultValues.description || "",
        category_id: defaultValues.category_id || "",
        price: defaultValues.price || 0,
        files: defaultValues.files || [],
        content_file: defaultValues.content_file,
      });
    }
  }, [defaultValues, form, mode]);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleSubmit = async (values: ContentFormValues) => {
    try {
      setUploadError(null);

      // If new file is selected, upload it first
      if (values.files && values.files.length > 0) {
        const file = values.files[0];

        // Upload file with compression
        const uploadedFile = await uploadSingle(file, {
          compress: true,
          requirePayment: values.price > 0,
        });

        if (!uploadedFile) {
          setUploadError("Upload file thất bại. Vui lòng thử lại.");
          return;
        }

        // Update content_file with uploaded file info
        values.content_file = {
          _id: uploadedFile._id || "",
          name: uploadedFile.name,
          type: uploadedFile.type?.toString() || "",
          size: uploadedFile.size || 0,
        };
      }

      // Submit form with uploaded file info
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
      setUploadError(error instanceof Error ? error.message : "Có lỗi xảy ra");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold tracking-wider">
                Tiêu đề <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tiêu đề bản vẽ..."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Tiêu đề ngắn gọn, mô tả chính xác nội dung bản vẽ (3-200 ký tự)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold tracking-wider">
                Mô tả chi tiết <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả chi tiết về bản vẽ, công năng, kích thước, yêu cầu kỹ thuật..."
                  className="min-h-[120px] resize-none"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Mô tả chi tiết giúp người dùng hiểu rõ hơn về nội dung (10-1000
                ký tự)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold tracking-wider">
                Danh mục <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading || isCategoriesLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isCategoriesLoading
                          ? "Đang tải danh mục..."
                          : "Chọn danh mục"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id || ""}>
                      <div className="flex items-center gap-2">
                        <span>{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          /{category.slug}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Chọn danh mục phù hợp để người dùng dễ dàng tìm kiếm
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold tracking-wider">
                Giá bán <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="number"
                    placeholder="0"
                    className="pl-10"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormDescription>
                {field.value > 0 && (
                  <span className="text-green-600 font-semibold">
                    {formatCurrency(field.value)}
                  </span>
                )}
                {field.value === 0 && (
                  <span className="text-gray-500">Nhập giá bán (VNĐ)</span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload */}
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold tracking-wider">
                File bản vẽ <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <Uploader
                    value={field.value || []}
                    onChange={field.onChange}
                    maxFiles={1}
                    maxSize={50 * 1024 * 1024}
                    accept={{
                      "application/pdf": [".pdf"],
                      "application/acad": [".dwg"],
                    }}
                  >
                    <Uploader.DropZone>
                      <Uploader.Placeholder />
                    </Uploader.DropZone>
                    <Uploader.MediaList />
                  </Uploader>

                  {/* Current file info in edit mode */}
                  {mode === "edit" && contentFile && !selectedFiles?.length && (
                    <div className="rounded-lg border bg-blue-50 p-3">
                      <p className="text-sm font-medium text-blue-900">
                        File hiện tại: {contentFile.name}
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        {formatFileSize(contentFile.size)}
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Chọn file bản vẽ (PDF hoặc DWG, tối đa 50MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Upload Error Alert */}
        {uploadError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t justify-between">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Hủy
            </Button>
          )}
          <Button
            type="submit"
            disabled={
              isLoading || isUploadingFile || form.formState.isDirty === false
            }
            loading={isLoading || isUploadingFile}
            className="ml-auto"
          >
            {isLoading || isUploadingFile ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isUploadingFile ? "Đang upload..." : "Đang xử lý..."}
              </>
            ) : mode === "create" ? (
              "Tạo mới"
            ) : (
              "Cập nhật"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContentEditorForm;
