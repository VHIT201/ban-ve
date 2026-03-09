"use client";

import {
  useGetApiCollaboratorsMe,
  usePostApiCollaboratorsApply,
} from "@/api/endpoints/collaborators";
import {
  CollaboratorApplyInput,
  CollaboratorResponseStatus,
} from "@/api/models";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { User, CreditCard, Percent, Building2Icon, ScanLine, Upload, Trash2 } from "lucide-react";
import { useMemo, useEffect, useState, useCallback } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { CollaboratorMe } from "@/api/types/collaborator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollaboratorContents } from "./components";
import UpdateQRCode from "./components/update-qr-code/UpdateQrCode";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { VIETNAM_BANKS } from "@/constants/banks";
import { ResponseData } from "@/api/types/base";
import CollaboratorRevenue from "./components/collaborator-revenue";

const collaboratorApplySchema = z.object({
  bankAccount: z
    .string()
    .min(1, "Vui lòng nhập số tài khoản")
    .min(9, "Số tài khoản phải có ít nhất 9 chữ số")
    .max(20, "Số tài khoản không được quá 20 chữ số")
    .regex(/^[0-9]+$/, "Số tài khoản chỉ được chứa số"),

  bankName: z.string().min(1, "Vui lòng chọn tên ngân hàng"),
  commissionRate: z
    .number()
    .min(0, "Tỷ lệ hoa hồng tối thiểu là 0%")
    .max(100, "Tỷ lệ hoa hồng tối đa là 100%"),
  qrCode: z.instanceof(Blob).optional(),
});

function CollaboratorForm() {
  const applyMutation = usePostApiCollaboratorsApply();
  
  // QR Code state
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);

  const form = useForm<typeof collaboratorApplySchema._type>({
    resolver: zodResolver(collaboratorApplySchema),
    defaultValues: {
      bankAccount: "",
      bankName: "",
      commissionRate: 30,
      qrCode: undefined,
    },
  });

  // Handle QR Code file change
  const handleQrCodeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
      form.setValue('qrCode', file as any);
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

  const onSubmit = (data: typeof collaboratorApplySchema._type) => {
    applyMutation.mutate(
      { data },
      {
        onSuccess: () => {
          const message = "Đã gửi đơn đăng ký thành công!";
          toast.success(message);
          form.reset();
          // Clear QR code state
          setQrCodeFile(null);
          setQrCodePreview(null);
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Gửi đơn thất bại";
          toast.error(message);
        },
      },
    );
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100 pb-6">
        <CardTitle className="text-xl font-bold text-gray-900">
          Đăng ký Cộng tác viên
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Trở thành cộng tác viên để kiếm thêm thu nhập từ việc bán dữ liệu
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Tên ngân hàng
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="lg:min-w-[400px]">
                          <div className="flex items-center gap-2">
                            <Building2Icon className="h-4 w-4 text-gray-500" />
                            <SelectValue placeholder="Chọn ngân hàng" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {VIETNAM_BANKS.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Số tài khoản ngân hàng
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập số tài khoản"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commissionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Tỷ lệ hoa hồng mong muốn (%)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="10"
                      className="h-10"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qrCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <ScanLine className="h-4 w-4" />
                      Ảnh mã QR ngân hàng <span className="text-muted-foreground">(tùy chọn)</span>
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
                            disabled={applyMutation.isPending}
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
                              disabled={applyMutation.isPending}
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
                    Tải lên ảnh mã QR của tài khoản ngân hàng để khách hàng dễ dàng thanh toán
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 mt-6"
              disabled={applyMutation.isPending}
            >
              {applyMutation.isPending ? "Đang gửi..." : "Gửi đơn đăng ký"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function CollaboratorStatus({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  const [activeTab, setActiveTab] = useState("info");
  
  // Get the query instance for refetch
  const getCollaboratorMeQuery = useGetApiCollaboratorsMe({
    query: {
      select: (data) => (data as unknown as ResponseData<CollaboratorMe>).data,
      retry: false,
      enabled: false, // Don't auto-fetch since we already have the data
    },
  }) as UseQueryResult<CollaboratorMe>;
  
  // Check hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'contents') {
      setActiveTab('contents');
    }
  }, []);
  
  const revenueData = useMemo(() => {
    const earnings = data?.earnings || null;
    return {
      totalRevenue: earnings?.totalAmount || 0,
      totalCommission: earnings?.totalCommission || 0,
      totalOrders: earnings?.totalOrders || 0,
      totalAdmin: earnings?.totalAdminAmount || 0,
    };
  }, [data]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="info">Thông tin cộng tác viên</TabsTrigger>
        <TabsTrigger value="qr-code">Cập nhật mã QR</TabsTrigger>
        <TabsTrigger value="contents">Sản phẩm cộng tác viên</TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-6">
        <CollaboratorRevenue loading={loading} revenueData={revenueData} />
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Thông tin Cộng tác viên
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  Chi tiết đơn đăng ký của bạn
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-5">
              {/* Bank Info */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Thông tin ngân hàng
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    {data.bankName}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {data.bankAccount}
                  </p>
                </div>
              </div>

              {/* Commission Rate */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Percent className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Tỷ lệ hoa hồng
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {data.commissionRate}%
                  </p>
                </div>
              </div>

              {/* QR Code */}
              {data.qrCodeUrl && (
                <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <ScanLine className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Mã QR thanh toán
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={data.qrCodeUrl}
                          alt="QR Code"
                          className="w-full h-full object-contain border border-gray-200 rounded-lg bg-white shadow-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-2">
                          Khách hàng có thể quét mã QR này để thanh toán trực tiếp vào tài khoản của bạn.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(data.qrCodeUrl, '_blank')}
                          className="text-xs"
                        >
                          Xem ảnh gốc
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Approver */}
              {data.approvedBy && (
                <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Người duyệt
                    </p>
                    <p className="text-sm text-gray-900">
                      {data.approvedBy.username || data.approvedBy.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Rejection Reason */}
              {data.rejectionReason &&
                data.status === CollaboratorResponseStatus.rejected && (
                  <div className="p-4 bg-red-50 border border-red-200">
                    <p className="text-sm font-semibold text-red-900 mb-1">
                      Lý do từ chối
                    </p>
                    <p className="text-sm text-red-700">
                      {data.rejectionReason}
                    </p>
                  </div>
                )}

              {/* Timestamps */}
              <div className="pt-4 border-t border-gray-100">
                <div className="space-y-2 text-xs text-gray-500">
                  {data.createdAt && (
                    <div className="flex items-center justify-between">
                      <span>Ngày gửi đơn</span>
                      <span className="font-medium text-gray-700">
                        {formatDistanceToNow(new Date(data.createdAt), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </span>
                    </div>
                  )}
                  {data.approvedAt && (
                    <div className="flex items-center justify-between">
                      <span>Ngày duyệt</span>
                      <span className="font-medium text-gray-700">
                        {formatDistanceToNow(new Date(data.approvedAt), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="qr-code" className="space-y-6">
        <UpdateQRCode 
          currentQrCodeUrl={data.qrCodeUrl}
          onSuccess={() => {
            // Refetch collaborator data to get updated QR code
            getCollaboratorMeQuery.refetch();
          }}
        />
      </TabsContent>

      <TabsContent value="contents" id="contents">
        <CollaboratorContents />
      </TabsContent>
    </Tabs>
  );
}

const Collaborator = () => {
  const getCollaboratorMeQuery = useGetApiCollaboratorsMe({
    query: {
      select: (data) => (data as unknown as ResponseData<CollaboratorMe>).data,
      retry: false,
    },
  }) as UseQueryResult<CollaboratorMe>;

  const collaboratorMe = useMemo(() => {
    return getCollaboratorMeQuery.data;
  }, [getCollaboratorMeQuery.data]);

  return (
    <div className="space-y-6">
      {collaboratorMe ? (
        <CollaboratorStatus
          data={collaboratorMe}
          loading={getCollaboratorMeQuery.isFetching}
        />
      ) : (
        <CollaboratorForm />
      )}
    </div>
  );
};

export default Collaborator;
