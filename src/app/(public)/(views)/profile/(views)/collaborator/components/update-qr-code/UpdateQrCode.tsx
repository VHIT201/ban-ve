"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePutApiCollaboratorsQrcode } from "@/api/endpoints/collaborators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  ScanLine,
  Upload,
  Trash2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

// Schema validation
const updateQRCodeSchema = z.object({
  qrCode: z.instanceof(Blob).optional(),
});

type UpdateQRCodeFormValues = z.infer<typeof updateQRCodeSchema>;

interface UpdateQRCodeProps {
  currentQrCodeUrl?: string;
  onSuccess?: () => void;
}

const UpdateQRCode = ({ currentQrCodeUrl, onSuccess }: UpdateQRCodeProps) => {
  const updateQrCodeMutation = usePutApiCollaboratorsQrcode();
  const queryClient = useQueryClient();

  // QR Code state
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);

  const form = useForm<UpdateQRCodeFormValues>({
    resolver: zodResolver(updateQRCodeSchema),
    defaultValues: {
      qrCode: undefined,
    },
  });

  // Handle QR Code file change
  const handleQrCodeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        form.setError('qrCode', { message: 'Vui lòng chọn file ảnh' });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        form.setError('qrCode', { message: 'Kích thước file không được vượt quá 5MB' });
        return;
      }
      
      setQrCodeFile(file);
      form.setValue('qrCode', file);
      form.clearErrors('qrCode');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrCodePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [form]);

  // Handle QR Code removal
  const handleQrCodeRemove = useCallback(() => {
    setQrCodeFile(null);
    setQrCodePreview(null);
    form.setValue('qrCode', undefined);
    form.clearErrors('qrCode');
  }, [form]);

  const onSubmit = async (values: UpdateQRCodeFormValues) => {
    if (!values.qrCode) {
      form.setError('qrCode', { message: 'Vui lòng chọn ảnh mã QR' });
      return;
    }

    try {
      await updateQrCodeMutation.mutateAsync(
        { data: values },
        {
          onSuccess: () => {
            toast.success("Cập nhật mã QR thành công!");
            form.reset();
            setQrCodeFile(null);
            setQrCodePreview(null);
            
            // Invalidate collaborator me query to refresh data
            queryClient.invalidateQueries({
              queryKey: ['/api/collaborators/me'],
            });
            
            onSuccess?.();
          },
          onError: (error: any) => {
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Cập nhật mã QR thất bại";
            toast.error(message);
          },
        }
      );
    } catch (error) {
      console.error("QR Code update error:", error);
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100 pb-6">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ScanLine className="w-5 h-5" />
          Cập nhật mã QR thanh toán
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Cập nhật ảnh mã QR của tài khoản ngân hàng để khách hàng dễ dàng thanh toán
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Current QR Code Display */}
            {currentQrCodeUrl && !qrCodePreview && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Mã QR hiện tại</h4>
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <img
                      src={currentQrCodeUrl}
                      alt="Current QR Code"
                      className="w-full h-full object-contain border border-gray-200 rounded bg-white shadow-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      Đây là mã QR hiện tại của bạn. Tải lên ảnh mới để thay thế.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(currentQrCodeUrl, '_blank')}
                      className="text-xs mt-2"
                    >
                      Xem ảnh gốc
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* QR Code Upload */}
            <FormField
              control={form.control}
              name="qrCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <ScanLine className="h-4 w-4" />
                      Ảnh mã QR mới <span className="text-red-500">*</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {/* Upload Area */}
                      {!qrCodePreview ? (
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleQrCodeChange}
                            disabled={updateQrCodeMutation.isPending}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                          />
                          <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 text-center">
                              <span className="font-medium">Nhấp để tải lên</span> hoặc kéo thả ảnh
                            </p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF tối đa 5MB</p>
                          </div>
                        </div>
                      ) : (
                        /* Preview Area */
                        <div className="relative">
                          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <img
                                src={qrCodePreview}
                                alt="QR Code Preview"
                                className="w-full h-full object-contain border border-gray-200 rounded bg-white"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {qrCodeFile?.name || "Mã QR đã tải lên"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {qrCodeFile ? `${(qrCodeFile.size / 1024).toFixed(1)} KB` : ""}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleQrCodeRemove}
                              disabled={updateQrCodeMutation.isPending}
                              className="flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Tải lên ảnh mã QR mới của tài khoản ngân hàng
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <Button
                type="submit"
                disabled={updateQrCodeMutation.isPending || !qrCodeFile}
                className="ml-auto"
              >
                {updateQrCodeMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Cập nhật mã QR
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateQRCode;
