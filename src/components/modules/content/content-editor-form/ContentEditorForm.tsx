// Core
import { useEffect, useMemo } from "react";
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
import {
  Upload,
  Loader2,
  FileText,
  DollarSign,
  AlertCircle,
  X,
} from "lucide-react";
import { isUndefined } from "lodash-es";

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
    file: z
      .instanceof(File)
      .refine(
        (file) => file.size <= 50 * 1024 * 1024,
        "Kích thước file không được vượt quá 50MB"
      )
      .refine((file) => {
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
        return validTypes.includes(file.type) || file.name.endsWith(".dwg");
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
    (data) => data.file !== undefined || data.content_file !== undefined,
    {
      message: "Vui lòng chọn file hoặc giữ file hiện tại",
      path: ["file"],
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
    useGetApiCategories();

  const categories = useMemo(() => categoriesData || [], [categoriesData]);

  // Initialize form
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      category_id: defaultValues?.category_id || "",
      price: defaultValues?.price || 0,
      file: defaultValues?.file,
      content_file: defaultValues?.content_file,
    },
  });

  // Watch file changes
  const selectedFile = form.watch("file");
  const contentFile = form.watch("content_file");

  // Reset form when mode changes
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title || "",
        description: defaultValues.description || "",
        category_id: defaultValues.category_id || "",
        price: defaultValues.price || 0,
        file: defaultValues.file,
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
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
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
              <FormLabel>
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
              <FormLabel>
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
              <FormLabel>
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
              <FormLabel>
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
          name="file"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>
                File bản vẽ <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  {/* Current File Display (Edit Mode) */}
                  {!selectedFile && contentFile && (
                    <div className="flex items-center gap-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="flex items-center justify-center w-10 h-10 rounded bg-blue-100">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {contentFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(contentFile.size)} • File hiện tại
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {contentFile.type}
                      </Badge>
                    </div>
                  )}

                  {/* Upload Button */}
                  {!selectedFile && (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              {contentFile
                                ? "Chọn file mới"
                                : "Nhấn để chọn file"}
                            </span>{" "}
                            hoặc kéo thả
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF hoặc DWG (tối đa 50MB)
                          </p>
                        </div>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.dwg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          disabled={isLoading}
                          {...field}
                        />
                      </label>
                    </div>
                  )}

                  {/* New File Preview */}
                  {selectedFile && (
                    <div className="flex items-center gap-3 p-4 border border-green-200 rounded-lg bg-green-50">
                      <div className="flex items-center justify-center w-10 h-10 rounded bg-green-100">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(selectedFile.size)} • File mới
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onChange(undefined);
                          const input = document.getElementById(
                            "file-upload"
                          ) as HTMLInputElement;
                          if (input) input.value = "";
                        }}
                        disabled={isLoading}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                {contentFile && !selectedFile
                  ? "Đang sử dụng file hiện tại. Upload file mới để thay thế."
                  : "Chỉ chấp nhận file PDF hoặc DWG, kích thước tối đa 50MB"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
            disabled={isLoading || form.formState.isDirty === false}
            loading={isLoading}
            className="ml-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang xử lý...
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
