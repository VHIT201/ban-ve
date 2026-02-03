import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { usePutApiCategoriesId } from "@/api/endpoints/categories";
import { CategoryDetailProps } from "../types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Tên danh mục là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc"),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface EditCategoryDialogProps {
  category: CategoryDetailProps | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const EditCategoryDialog = ({
  category,
  open,
  onOpenChange,
  onSuccess,
}: EditCategoryDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: updateCategory } = usePutApiCategoriesId();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  // Reset form when category changes
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        slug: category.slug,
        description: category.description || "",
      });
    }
  }, [category, form]);

  const onSubmit = async (data: CategoryFormValues) => {
    if (!category?._id) return;

    setIsLoading(true);
    try {
      await updateCategory({
        id: category._id,
        data,
      });
      
      toast.success("Cập nhật danh mục thành công");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate slug from name
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name") {
        const slug = value.name
          ?.toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || "";
        form.setValue("slug", slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Hủy
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
