"use client";

import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePostApiContacts } from "@/api/endpoints/contacts";

// Form schema
const contactFormSchema = z.object({
  full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự").max(25,"Họ tên có nhiều nhất 25 ký tự").regex(
    /^\S(.*\S)?$/,
    "Họ tên không được có khoảng trắng ở đầu hoặc cuối"
  ),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  phone: z.string().regex(/^0\d{9}$/, "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0").regex(
    /^\S(.*\S)?$/,
    "Số điện thoại không được có khoảng trắng ở đầu hoặc cuối"
  ),
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự").max(30,"Tiêu đề phải có nhiều nhất 30 ký tự").optional(),
  message: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự").max(2000,"Nội dung phải có nhiều nhất 2000 ký tự").optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const contactInfoItems = [
  {
    icon: MapPin,
    title: "Địa chỉ",
    content: (
      <>
        123 Đường ABC, Phường XYZ
        <br />
        Quận 1, TP. Hồ Chí Minh
      </>
    ),
  },
  {
    icon: Mail,
    title: "Email",
    content: (
      <a
        href="mailto:contact@blueprint.vn"
        className="text-primary hover:text-primary/80 hover:underline transition-all font-medium"
      >
        contact@blueprint.vn
      </a>
    ),
  },
  {
    icon: Phone,
    title: "Điện thoại",
    content: (
      <>
        <a
          href="tel:+84234567890"
          className="text-primary hover:text-primary/80 hover:underline transition-all font-medium"
        >
          +84 234 567 890
        </a>
        <p className="text-xs text-muted-foreground mt-1">
          T2 - T6: 8:00 - 17:00
        </p>
      </>
    ),
  },
];

export default function ContactPage() {
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const postContactMutation = usePostApiContacts({
    mutation: {
      onSuccess: () => {
        setSuccessMessage(true);
        reset();
        toast.success("Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm.");
        setTimeout(() => setSuccessMessage(false), 5000);
      },
      onError: (error: any) => {
        toast.error(error?.message || "Có lỗi xảy ra, vui lòng thử lại");
      },
    },
  });

  const onSubmit = (data: ContactFormData) => {
    postContactMutation.mutate({ data });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-primary/50">
      <div className="container mx-auto px-4 sm:px-6 py-16 pt-0 md:py-24 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-br py-2 from-primary to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Liên hệ với chúng tôi
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Chúng tôi luôn sẵn sàng hỗ trợ bạn
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16"
        >
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">
                Thông tin liên hệ
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Hãy liên hệ với chúng tôi qua biểu mẫu hoặc thông tin bên dưới
              </p>
            </div>

            <div className="space-y-4">
              {contactInfoItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-all border border-primary/20">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm mb-1">
                      {item.title}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="relative">
              {/* Success Message Overlay */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-lg"
                >
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-500 mx-auto" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        Gửi thành công!
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Chúng tôi sẽ liên hệ lại sớm nhất
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 shadow-lg hover:-translate-y-6 transition-all duration-500">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-2 text-foreground">
                    Gửi tin nhắn
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Điền thông tin bên dưới để liên hệ với chúng tôi
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">
                        Họ và tên <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="full_name"
                        {...register("full_name")}
                        placeholder="Nguyễn Văn A"
                        className="h-11"
                      />
                      {errors.full_name && (
                        <p className="text-xs text-destructive">
                          {errors.full_name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="0912 345 678"
                        className="h-11"
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="email@example.com"
                      className="h-11"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="Tiêu đề liên hệ"
                      className="h-11"
                    />
                    {errors.title && (
                      <p className="text-xs text-destructive">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Nhập nội dung chi tiết..."
                      rows={5}
                      className="resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 gap-2"
                    disabled={postContactMutation.isPending}
                  >
                    {postContactMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Gửi tin nhắn
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
