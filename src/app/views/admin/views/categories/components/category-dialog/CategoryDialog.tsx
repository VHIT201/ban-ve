// Core
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { CATEGORY_SCHEMA, DEFAULT_CATEGORY_FORM_VALUES } from "./lib/constants";
import { generateSlug } from "@/utils/slug";
import { CategoryFormValues } from "./lib/types";
import { Uploader } from "@/components/shared";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
  mode?: "create" | "edit";
  onSubmit: (data: CategoryFormValues) => void | Promise<void>;
  loading?: boolean;
}

const CategoryDialog = (props: CategoryDialogProps) => {
  // Props
  const {
    open,
    onOpenChange,
    category = DEFAULT_CATEGORY_FORM_VALUES,
    mode = "create",
    onSubmit,
    loading = false,
  } = props;

  // Form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CATEGORY_SCHEMA),
    defaultValues: category,
  });

  const watchName = form.watch("name");

  useEffect(() => {
    if (mode === "create" && watchName) {
      form.setValue("slug", generateSlug(watchName));
    }
  }, [watchName, mode, form]);

  useEffect(() => {
    if (open && category && mode === "edit") {
      form.reset(category);
    } else if (!open) {
      form.reset(DEFAULT_CATEGORY_FORM_VALUES);
    }
  }, [open, category, mode, form]);

  const handleSubmit = async (data: CategoryFormValues) => {
    await onSubmit(data);
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
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ScrollArea className="h-[70vh]">
              <div className="mx-4 space-y-6">
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
                          disabled
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
                {/* Category Image */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold tracking-wider">
                        File bản vẽ <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <Uploader
                            value={field.value ? [field.value] : []}
                            onChange={(files) => field.onChange(files[0])}
                            maxFiles={1}
                            maxSize={50 * 1024 * 1024}
                            accept={{
                              "image/*": [],
                            }}
                          >
                            <Uploader.DropZone>
                              <Uploader.Placeholder />
                            </Uploader.DropZone>
                            <Uploader.MediaList />
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
              </div>
            </ScrollArea>
            <DialogFooter className="space-x-2 py-2 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button type="submit" loading={loading}>
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
