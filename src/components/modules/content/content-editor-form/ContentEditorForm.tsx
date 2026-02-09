"use client";

// Core
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

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

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGetApiCategoriesAllTree } from "@/api/endpoints/categories";
import {
  Loader2,
  DollarSign,
  AlertCircle,
  X,
  Check,
  FileText,
  ShieldAlert,
  Info,
  CheckCircle2,
} from "lucide-react";
import { ResponseData } from "@/api/types/base";
import { TreeSelect, Uploader } from "@/components/shared";
import { useUploadMedia } from "@/hooks";
import {
  Dialog,
  DialogContent,
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
        (files) => files.every((file) => file.size <= 100 * 1024 * 1024),
        "Kích thước file không được vượt quá 100MB",
      )
      .optional(),
    files: z
      .array(z.instanceof(File))
      .min(1, "Vui lòng chọn ít nhất 1 file")
      .max(5, "Tối đa chỉ được chọn 5 file")
      .refine(
        (files) => files.every((file) => file.size <= 100 * 1024 * 1024),
        "Kích thước file không được vượt quá 100MB",
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
  mode?: "create" | "edit" | "view";
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
          (files) => files.every((file) => file.size <= 100 * 1024 * 1024),
          "Kích thước file không được vượt quá 100MB",
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

    const filesSchema = defaultFile
      ? z
          .array(z.instanceof(File))
          .max(5, "Tối đa chỉ được chọn 5 file")
          .refine((files) => {
            if (!files || files.length === 0) return true;
            return files.every((file) => file.size <= 100 * 1024 * 1024);
          }, "Kích thước file không được vượt quá 100MB")
          .optional()
      : z
          .array(z.instanceof(File))
          .min(1, "Vui lòng chọn ít nhất 1 file")
          .max(5, "Tối đa chỉ được chọn 5 file")
          .refine(
            (files) => files.every((file) => file.size <= 100 * 1024 * 1024),
            "Kích thước file không được vượt quá 100MB",
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
    disabled: mode === "view",
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
  const getCategoryTreeQuery = useGetApiCategoriesAllTree(
    {},
    {
      query: {
        select: (data) => {
          try {
            const response = data as unknown as ResponseData<any>;
            console.log("API Response:", response);

            // Try different possible structures
            if (response?.data?.tree && Array.isArray(response.data.tree)) {
              return response.data.tree;
            }
            if (response?.data && Array.isArray(response.data)) {
              return response.data;
            }
            if (Array.isArray(response)) {
              return response;
            }

            console.log("Unexpected data structure:", response);
            return [];
          } catch (error) {
            console.error("Error processing category tree data:", error);
            return [];
          }
        },
      },
    },
  );

  const treeData = useMemo(() => {
    // Handle loading or error states
    if (getCategoryTreeQuery.isLoading || getCategoryTreeQuery.isError) {
      return [];
    }

    if (!getCategoryTreeQuery.data) {
      return [];
    }
    if (!Array.isArray(getCategoryTreeQuery.data)) {
      return [];
    }

    return getCategoryTreeQuery.data.map(transformCategoryToTreeItem);
  }, [
    getCategoryTreeQuery.data,
    getCategoryTreeQuery.isLoading,
    getCategoryTreeQuery.isError,
  ]);

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

      // Debug log
      console.log("Submitting form with values:", values);
      console.log("Price value:", values.price);

      // If new file is selected, upload it first
      if (values.files && values.files.length > 0) {
        const file = values.files[0];

        if (!file) {
          setUploadError("File không hợp lệ. Vui lòng thử lại.");
          return;
        }

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

      // Debug log before submit
      console.log("Final values before onSubmit:", values);

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
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0">
            <div className="overflow-y-auto max-h-[85vh]">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="sticky top-0 z-10 bg-white border-b px-6 py-4"
              >
                <DialogTitle className="text-lg font-semibold flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Xác nhận đăng bài</span>
                </DialogTitle>
              </motion.div>

              {/* Content */}
              <div className="px-6 py-5 space-y-4">
                {/* Warning Banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-start gap-3 p-3.5 bg-amber-50/50 border border-amber-200/60 rounded-lg"
                >
                  <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-amber-900">
                      Vui lòng đọc kỹ trước khi tiếp tục
                    </h3>
                    <p className="text-xs text-amber-700/80">
                      Bạn cần xác nhận các điều khoản bên dưới để đăng tải nội
                      dung
                    </p>
                  </div>
                </motion.div>

                {/* Post Information */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span>Thông tin bài đăng</span>
                  </div>
                  <div className="grid gap-2 rounded-lg border bg-muted/30 p-3.5">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs text-muted-foreground">
                        Tiêu đề
                      </span>
                      <span className="text-xs font-medium text-right">
                        {formValues?.title || "Chưa có tiêu đề"}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs text-muted-foreground">
                        Giá bán
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        {formValues?.price
                          ? new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(formValues.price)
                          : "Miễn phí"}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Terms & Conditions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Cam kết của người đăng</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Tôi là chủ sở hữu hoặc có đầy đủ quyền đối với nội dung đăng tải",
                      "Nội dung không vi phạm bản quyền hoặc quyền sở hữu trí tuệ",
                      "Tôi đã đọc và đồng ý với điều khoản sử dụng",
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.25 + index * 0.05,
                        }}
                        className="flex items-start gap-2.5 text-xs text-muted-foreground"
                      >
                        <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Disclaimer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="rounded-lg border border-border/50 bg-muted/20 p-3.5"
                >
                  <h4 className="text-xs font-medium text-foreground mb-2">
                    Miễn trừ trách nhiệm
                  </h4>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <p>
                      • Nền tảng không chịu trách nhiệm về nội dung người dùng
                      đăng tải
                    </p>
                    <p>
                      • Bạn hoàn toàn chịu trách nhiệm về bản quyền và tính hợp
                      pháp
                    </p>
                    <p>
                      • Chúng tôi có quyền gỡ bỏ nội dung vi phạm điều khoản
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Footer Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="sticky bottom-0 bg-white border-t px-6 py-4 flex items-center justify-between gap-3"
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={isLoading || isUploadingFile}
                  className="min-w-[100px]"
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirmSubmit}
                  disabled={isLoading || isUploadingFile}
                  className="min-w-[140px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  {isLoading || isUploadingFile ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Xác nhận
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
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
                      field.onChange(
                        Math.round(parseFloat(e.target.value) * 100) / 100 || 0,
                      )
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
                    maxSize={100 * 1024 * 1024}
                    accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                  >
                    {mode !== "view" && (
                      <Uploader.DropZone>
                        <Uploader.Placeholder />
                      </Uploader.DropZone>
                    )}
                    <Uploader.MediaList />
                    <Uploader.Exists
                      data={
                        defaultImages?.map((image) => {
                          return {
                            id: image,
                            name: image.split("/").pop() || "image",
                            size: 0,
                            path: image,
                            type: "image/*",
                          };
                        }) ?? []
                      }
                    />
                  </Uploader>
                </div>
              </FormControl>
              <FormDescription>
                Chọn ảnh sản phẩm (PNG, JPG, JPEG, WEBP, tối đa 100MB)
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
                    maxSize={100 * 1024 * 1024}
                  >
                    {mode !== "view" && (
                      <Uploader.DropZone>
                        <Uploader.Placeholder />
                      </Uploader.DropZone>
                    )}
                    <Uploader.MediaList />
                    <Uploader.Exists
                      data={
                        defaultValues?.content_file
                          ? [
                              {
                                id: defaultValues.content_file._id,
                                name: defaultValues.content_file.name,
                                size: defaultValues.content_file.size,
                                path: defaultValues.content_file._id,
                                type: defaultValues.content_file.type,
                              },
                            ]
                          : []
                      }
                    />
                  </Uploader>
                </div>
              </FormControl>
              <FormDescription>
                Chọn file bản vẽ (PDF hoặc DWG, tối đa 100MB)
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
        {mode !== "view" && (
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
            <Button type="submit" disabled={isLoading || isUploadingFile}>
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
        )}
      </form>
    </Form>
  );
};

export default ContentEditorForm;
