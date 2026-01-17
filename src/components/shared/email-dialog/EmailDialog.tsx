import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Loader2, ShoppingBag, Shield, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Schema validation với Zod
const formSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Bạn cần đồng ý với điều khoản để tiếp tục",
  }),
  acceptMarketing: z.boolean().default(false),
});

type EmailDialogProps = {
  trigger?: React.ReactNode;
  defaultEmail?: string;
  onEmailSubmit?: (email: string, acceptMarketing: boolean) => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  productName?: string;
  productPrice?: number;
};

const EmailDialog = ({
  trigger,
  defaultEmail,
  onEmailSubmit,
  open,
  onOpenChange,
}: EmailDialogProps) => {
  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Khởi tạo form với react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail || "",
      acceptTerms: false,
      acceptMarketing: false,
    },
  });

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    simulateProgress();

    try {
      await onEmailSubmit?.(values.email, values.acceptMarketing);
      setIsSubmitted(true);

      // Reset form sau 3 giây
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
        if (onOpenChange) onOpenChange(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
    } finally {
      setIsSubmitting(false);
      setProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="sm:max-w-md md:max-w-lg">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <Mail className="size-16 text-primary" />
              </div>
              <DialogTitle className="text-center text-xl md:text-2xl">
                Nhập email để tiếp tục mua hàng
              </DialogTitle>
              <DialogDescription className="text-center">
                Chúng tôi sẽ gửi thông tin đơn hàng và xác nhận đến email của
                bạn
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="nguyenvana@example.com"
                          type="email"
                          className="h-12"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Tôi đồng ý với
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              điều khoản dịch vụ
                            </a>
                            và
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              chính sách bảo mật
                            </a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="acceptMarketing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Tôi muốn nhận thông tin khuyến mãi và cập nhật sản
                            phẩm mới qua email
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  /> */}
                </div>

                {/* Thanh tiến trình khi đang gửi */}
                {isSubmitting && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      Đang xử lý thông tin...
                    </p>
                  </div>
                )}

                <Separator />

                <DialogFooter className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto mx-auto flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>Tiếp tục mua hàng</>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>

            <div className="text-xs text-muted-foreground text-center pt-4 border-t">
              <p>
                Chúng tôi cam kết bảo vệ thông tin của bạn. Email chỉ được sử
                dụng cho mục đích giao dịch.
              </p>
            </div>
          </>
        ) : (
          // Trạng thái thành công
          <div className="text-center py-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Thành công!</h3>
            <p className="text-muted-foreground mb-6">
              Chúng tôi đã gửi thông tin xác nhận đến email của bạn.
              <br />
              Vui lòng kiểm tra hộp thư để hoàn tất đơn hàng.
            </p>
            <div className="animate-pulse text-sm text-muted-foreground">
              Đang chuyển hướng...
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
