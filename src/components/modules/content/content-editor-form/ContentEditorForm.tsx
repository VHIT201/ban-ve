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
import {
  useGetApiCategories,
  useGetApiCategoriesAllTree,
} from "@/api/endpoints/categories";
import {
  Loader2,
  DollarSign,
  AlertCircle,
  X,
  Check,
  FileText,
} from "lucide-react";
import { ResponseData } from "@/api/types/base";
import { Category } from "@/api/models";
import { TreeSelect, Uploader } from "@/components/shared";
import { useUploadMedia } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TreeViewItem } from "@/components/shared/tree-view/TreeView";
import { TreeNode } from "@/components/shared/tree-select/TreeSelect";
import { isEmpty } from "lodash-es";

// Schema validation
const contentFormSchemaStatic = z
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
    images: z
      .array(z.instanceof(File))
      .min(1, "Vui lòng chọn ít nhất 1 file")
      .max(5, "Tối đa chỉ được chọn 5 file")
      .refine(
        (files) => files.every((file) => file.size <= 50 * 1024 * 1024),
        "Kích thước file không được vượt quá 50MB",
      )
      .optional(),
    files: z
      .array(z.instanceof(File))
      .min(1, "Vui lòng chọn ít nhất 1 file")
      .max(5, "Tối đa chỉ được chọn 5 file")
      .refine(
        (files) => files.every((file) => file.size <= 50 * 1024 * 1024),
        "Kích thước file không được vượt quá 50MB",
      )
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
    },
  );

export type ContentFormValues = z.infer<typeof contentFormSchemaStatic>;

interface ContentEditorFormProps {
  mode?: "create" | "edit";
  defaultFile?: {
    name: string;
    size: number;
    path: string;
    type: string;
    id: string;
  };
  defaultImages?: string[];
  defaultValues?: Partial<ContentFormValues>;
  onSubmit: (values: ContentFormValues) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onCancel?: () => void;
}

const ContentEditorForm = ({
  mode = "create",
  defaultValues,
  defaultFile,
  defaultImages = [],
  onSubmit,
  isLoading = false,
  error = null,
  onCancel,
}: ContentEditorFormProps) => {
  const contentFormSchema = useMemo(() => {
    const baseSchema = z.object({
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
      images: z
        .array(z.instanceof(File))
        .min(1, "Vui lòng chọn ít nhất 1 file")
        .max(5, "Tối đa chỉ được chọn 5 file")
        .refine(
          (files) => files.every((file) => file.size <= 50 * 1024 * 1024),
          "Kích thước file không được vượt quá 50MB",
        )
        .optional(),
      content_file: z
        .object({
          _id: z.string(),
          name: z.string(),
          type: z.string(),
          size: z.number(),
        })
        .optional(),
    });

    // Tạo schema cho files dựa trên mode và defaultFile
    const filesSchema = defaultFile
      ? z
          .array(z.instanceof(File))
          .max(5, "Tối đa chỉ được chọn 5 file")
          .refine((files) => {
            if (!files || files.length === 0) return true;
            return files.every((file) => file.size <= 50 * 1024 * 1024);
          }, "Kích thước file không được vượt quá 50MB")
          .optional()
      : z
          .array(z.instanceof(File))
          .min(1, "Vui lòng chọn ít nhất 1 file")
          .max(5, "Tối đa chỉ được chọn 5 file")
          .refine(
            (files) => files.every((file) => file.size <= 50 * 1024 * 1024),
            "Kích thước file không được vượt quá 50MB",
          )
          .optional();

    return baseSchema.extend({ files: filesSchema }).refine(
      (data) => {
        const hasExistingFile = defaultFile || data.content_file;
        const hasNewFiles = data.files && data.files.length > 0;
        return hasExistingFile || hasNewFiles;
      },
      {
        message: "Vui lòng chọn file hoặc giữ file hiện tại",
        path: ["files"],
      },
    );
  }, [defaultFile]);

  // Upload media hook
  const { uploadSingle, isUploading: isUploadingFile } = useUploadMedia();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formValues, setFormValues] = useState<ContentFormValues | null>(null);

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

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const selectedCategory = form.getValues("category_id");

  const transformCategoryToTreeItem = (category: any): TreeViewItem => {
    return {
      id: category._id || category.id,
      name: category.name,
      type:
        category.children && category.children.length > 0 ? "folder" : "file",
      children: category.children?.map(transformCategoryToTreeItem),
      checked: selectedCategory === (category._id || category.id),
    };
  };

  // Queries
  const getCategoryTreeQuery = useGetApiCategoriesAllTree({
    query: {
      select: (data) => (data as unknown as ResponseData<any>).data.tree,
    },
  });

  const treeData = useMemo(() => {
    if (!getCategoryTreeQuery.data) return [];
    return getCategoryTreeQuery.data.map(transformCategoryToTreeItem);
  }, [getCategoryTreeQuery.data]);

  // Methods
  const handleSubmit = async (values: ContentFormValues) => {
    // Store form values and show confirmation dialog
    setFormValues(values);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (formValues) {
      await submitForm(formValues);
      setShowConfirmDialog(false);
    }
  };

  const submitForm = async (values: ContentFormValues) => {
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

  const mapApiNodeToTreeNode = (node: any[]): TreeNode[] => {
    return node.map((item: any) => ({
      id: item.id,
      label: item.name,
      disabled: false,
      children: item.children?.length
        ? mapApiNodeToTreeNode(item.children)
        : undefined,
    })) as TreeNode[];
  };

  const mappedTreeData: TreeNode[] = mapApiNodeToTreeNode(
    treeData as any,
  ) as TreeNode[];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Điều Khoản Miễn Trừ Trách Nhiệm và Xác Nhận Đăng Bài
              </DialogTitle>
              <DialogDescription className="text-left pt-4 space-y-4">
                <div className="space-y-4 text-gray-700">
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <h3 className="font-semibold text-amber-800 mb-2">
                      THÔNG BÁO QUAN TRỌNG
                    </h3>
                    <p className="text-sm">
                      Trước khi đăng tải nội dung, vui lòng đọc kỹ các điều
                      khoản sau:
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    1. Miễn Trừ Trách Nhiệm
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>
                      Nền tảng không chịu trách nhiệm về nội dung do người dùng
                      đăng tải.
                    </li>
                    <li>
                      Bạn hoàn toàn chịu trách nhiệm về bản quyền và tính hợp
                      pháp của nội dung.
                    </li>
                    <li>
                      Chúng tôi có quyền gỡ bỏ bất kỳ nội dung nào vi phạm điều
                      khoản dịch vụ.
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">2. Thông Tin Bài Đăng</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Tiêu đề:</span>{" "}
                      {formValues?.title || "Chưa có tiêu đề"}
                    </p>
                    {/* <p>
                      <span className="font-medium">Danh mục:</span>{" "}
                      {categories.find((c) => c._id === formValues?.category_id)
                        ?.name || "Chưa chọn"}
                    </p> */}
                    <p>
                      <span className="font-medium">Giá:</span>{" "}
                      {formValues?.price
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(formValues.price)
                        : "Miễn phí"}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">
                    3. Cam Kết Của Người Đăng
                  </h4>
                  <p className="text-sm text-red-700">
                    Bằng việc nhấn "Xác nhận đăng bài", bạn cam kết:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-red-700">
                    <li>
                      Tôi là chủ sở hữu hoặc có đầy đủ quyền đối với nội dung
                      đăng tải
                    </li>
                    <li>
                      Nội dung không vi phạm bản quyền hoặc quyền sở hữu trí tuệ
                    </li>
                    <li>Tôi đã đọc và đồng ý với tất cả điều khoản sử dụng</li>
                  </ul>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-between pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="min-w-[100px]"
              >
                Hủy bỏ
              </Button>
              <Button
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isLoading || isUploadingFile}
                className="bg-blue-600 hover:bg-blue-700 min-w-[150px]"
              >
                {isLoading || isUploadingFile ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Xác nhận đăng bài
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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

              <TreeSelect
                multiple={false}
                nodes={mappedTreeData}
                value={isEmpty(field.value) ? [] : [field.value]}
                onChange={(selected) => {
                  console.log("Selected category ID:", selected);
                  field.onChange(selected[0] || "");
                }}
                placeholder="Chọn danh mục"
                searchable={true}
                maxHeight="350px"
                className="max-w-[300px]"
              />

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

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold tracking-wider">
                Ảnh sản phẩm <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <Uploader
                    multiple
                    maxFiles={5}
                    value={field.value || []}
                    onChange={field.onChange}
                    maxSize={50 * 1024 * 1024}
                    accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                  >
                    <Uploader.DropZone>
                      <Uploader.Placeholder />
                    </Uploader.DropZone>
                    <Uploader.MediaList
                      defaultValues={defaultImages?.map((image) => image)}
                    />
                  </Uploader>
                </div>
              </FormControl>
              <FormDescription>
                Chọn ảnh sản phẩm (PNG, JPG, JPEG, WEBP, tối đa 50MB)
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
                  >
                    <Uploader.DropZone>
                      <Uploader.Placeholder />
                    </Uploader.DropZone>
                    <Uploader.MediaList />
                    <Uploader.Exists
                      data={
                        defaultFile
                          ? [
                              {
                                id: defaultFile?.id || "",
                                name: defaultFile?.name || "",
                                size: defaultFile?.size || 0,
                                path: defaultFile?.path || "",
                                type: defaultFile?.type || "",
                              },
                            ]
                          : []
                      }
                    />
                  </Uploader>
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

        {/* Form actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading || isUploadingFile}
            >
              Hủy
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading || isUploadingFile}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading || isUploadingFile ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : mode === "create" ? (
              "Đăng bài"
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
