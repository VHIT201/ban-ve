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
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
});

type EmailDialogProps = {
  trigger?: React.ReactNode;
  defaultEmail?: string;
  onEmailSubmit?: (email: string) => void | Promise<void>;
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
      email: defaultEmail ?? "",
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
      await onEmailSubmit?.(values.email);
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
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <Mail className="size-16 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl md:text-2xl">
            Nhập email để tiếp tục mua hàng
          </DialogTitle>
          <DialogDescription className="text-center">
            Chúng tôi sẽ gửi thông tin đơn hàng và xác nhận đến email của bạn
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Thanh tiến trình khi đang gửi */}
            {isSubmitting && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">
                  Đang xử lý thông tin...
                </p>
              </div>
            )}

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
            Chúng tôi cam kết bảo vệ thông tin của bạn. Email chỉ được sử dụng
            cho mục đích giao dịch.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
