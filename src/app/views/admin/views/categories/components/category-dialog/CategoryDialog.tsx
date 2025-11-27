// Core
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// App
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Category } from "@/api/models";

// Zod schema
const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Tên danh mục không được để trống")
    .max(100, "Tên danh mục không được vượt quá 100 ký tự"),
  slug: z.string().min(1, "Slug không được để trống"),
  description: z
    .string()
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .optional()
    .or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
  mode?: "create" | "edit";
  onSubmit: (data: CategoryFormValues) => void | Promise<void>;
  isLoading?: boolean;
}

const CategoryDialog = (props: CategoryDialogProps) => {
  const {
    open,
    onOpenChange,
    category,
    mode = "create",
    onSubmit,
    isLoading = false,
  } = props;

  // Form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Watch name field to auto-generate slug
  const watchName = form.watch("name");

  useEffect(() => {
    if (mode === "create" && watchName) {
      form.setValue("slug", generateSlug(watchName));
    }
  }, [watchName, mode, form]);

  // Reset form when dialog opens/closes or category changes
  useEffect(() => {
    if (open && category && mode === "edit") {
      form.reset({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
      });
    } else if (!open) {
      form.reset({
        name: "",
        slug: "",
        description: "",
      });
    }
  }, [open, category, mode, form]);

  const handleSubmit = async (data: CategoryFormValues) => {
    await onSubmit(data);
    if (!isLoading) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tạo danh mục mới" : "Chỉnh sửa danh mục"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Điền thông tin để tạo danh mục mới cho bản vẽ"
              : "Cập nhật thông tin danh mục"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên danh mục <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên danh mục (vd: Kiến trúc, Cơ khí...)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tên danh mục phải là duy nhất (tối đa 100 ký tự)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug Field */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Slug <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="slug-tu-dong-tao"
                      {...field}
                      disabled={mode === "edit"}
                    />
                  </FormControl>
                  <FormDescription>
                    {mode === "create"
                      ? "Slug tự động tạo từ tên danh mục"
                      : "Slug không thể chỉnh sửa"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả chi tiết về danh mục này..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Mô tả chi tiết về danh mục (tối đa 500 ký tự)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Hủy
              </Button>
              <Button type="submit" loading={isLoading}>
                {mode === "create" ? "Tạo danh mục" : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
