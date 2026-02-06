// Core
import { useEffect } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  AlertCircle,
  Building2,
  CreditCard,
  Percent,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Vietnamese banks list
const vietnameseBanks = [
  "Vietcombank - Ngân hàng TMCP Ngoại thương Việt Nam",
  "VietinBank - Ngân hàng TMCP Công thương Việt Nam",
  "BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
  "Agribank - Ngân hàng Nông nghiệp và Phát triển Nông thôn",
  "Techcombank - Ngân hàng TMCP Kỹ thương Việt Nam",
  "MB Bank - Ngân hàng TMCP Quân đội",
  "ACB - Ngân hàng TMCP Á Châu",
  "VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng",
  "TPBank - Ngân hàng TMCP Tiên Phong",
  "Sacombank - Ngân hàng TMCP Sài Gòn Thương Tín",
  "HDBank - Ngân hàng TMCP Phát triển TP.HCM",
  "VIB - Ngân hàng TMCP Quốc tế",
  "SHB - Ngân hàng TMCP Sài Gòn - Hà Nội",
  "Eximbank - Ngân hàng TMCP Xuất Nhập khẩu Việt Nam",
  "MSB - Ngân hàng TMCP Hàng Hải",
  "OCB - Ngân hàng TMCP Phương Đông",
  "SCB - Ngân hàng TMCP Sài Gòn",
  "SeABank - Ngân hàng TMCP Đông Nam Á",
  "VietCapital Bank - Ngân hàng TMCP Bản Việt",
  "Bac A Bank - Ngân hàng TMCP Bắc Á",
  "Nam A Bank - Ngân hàng TMCP Nam Á",
  "VietBank - Ngân hàng TMCP Việt Nam Thương Tín",
  "LienViet Post Bank - Ngân hàng TMCP Bưu điện Liên Việt",
  "PVComBank - Ngân hàng TMCP Đại Chúng Việt Nam",
  "Cake by VPBank - Ngân hàng số",
  "Timo by VPBank - Ngân hàng số",
  "Ubank by VPBank - Ngân hàng số",
];

// Schema validation
const collaboratorRequestFormSchema = z.object({
  bankAccount: z
    .string()
    .min(1, "Vui lòng nhập số tài khoản")
    .regex(/^[0-9]{6,20}$/, "Số tài khoản không hợp lệ (6-20 chữ số)"),
  bankName: z.string().min(1, "Vui lòng chọn ngân hàng"),
  commissionRate: z
    .number({
      required_error: "Vui lòng nhập tỷ lệ hoa hồng",
      invalid_type_error: "Tỷ lệ hoa hồng phải là số",
    })
    .min(0, "Tỷ lệ hoa hồng không được âm")
    .max(100, "Tỷ lệ hoa hồng không được vượt quá 100%"),
  rejectionReason: z.string().optional(),
});

export type CollaboratorRequestFormValues = z.infer<
  typeof collaboratorRequestFormSchema
>;

interface CollaboratorRequestFormProps {
  mode?: "create" | "edit" | "review" | "view";
  defaultValues?: Partial<CollaboratorRequestFormValues>;
  onSubmit: (values: CollaboratorRequestFormValues) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onCancel?: () => void;
  requestStatus?: "pending" | "approved" | "rejected";
  userInfo?: {
    fullName?: string;
    email?: string;
  };
  approvedBy?: {
    fullName?: string;
    email?: string;
  };
  approvedAt?: string;
}

const CollaboratorRequestForm = ({
  mode = "create",
  defaultValues,
  onSubmit,
  isLoading = false,
  error = null,
  onCancel,
  requestStatus = "pending",
  userInfo,
  approvedBy,
  approvedAt,
}: CollaboratorRequestFormProps) => {
  // Initialize form
  const form = useForm<CollaboratorRequestFormValues>({
    resolver: zodResolver(collaboratorRequestFormSchema),
    defaultValues: {
      bankAccount: defaultValues?.bankAccount || "",
      bankName: defaultValues?.bankName || "",
      commissionRate: defaultValues?.commissionRate || 10,
      rejectionReason: defaultValues?.rejectionReason || "",
    },
  });

  // Watch commission rate
  const commissionRate = form.watch("commissionRate");

  // Reset form when mode changes
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        bankAccount: defaultValues.bankAccount || "",
        bankName: defaultValues.bankName || "",
        commissionRate: defaultValues.commissionRate || 10,
        rejectionReason: defaultValues.rejectionReason || "",
      });
    }
  }, [defaultValues, form, mode]);

  const handleSubmit = async (values: CollaboratorRequestFormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isViewMode = mode === "view";
  const isReviewMode = mode === "review";
  const isDisabled = isLoading || isViewMode;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          label: "Đã phê duyệt",
          variant: "default" as const,
          className: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle2,
        };
      case "rejected":
        return {
          label: "Đã từ chối",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle,
        };
      default:
        return {
          label: "Chờ duyệt",
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: AlertCircle,
        };
    }
  };

  const statusConfig = getStatusConfig(requestStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Status Badge (View/Review mode) */}
        {(isViewMode || isReviewMode) && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusIcon className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Trạng thái yêu cầu</p>
                    <Badge
                      variant={statusConfig.variant}
                      className={`${statusConfig.className} mt-1`}
                    >
                      {statusConfig.label}
                    </Badge>
                  </div>
                </div>
                {approvedBy && approvedAt && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Phê duyệt bởi
                    </p>
                    <p className="font-medium">{approvedBy.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(approvedAt).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Info (View/Review mode) */}
        {(isViewMode || isReviewMode) && userInfo && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Người đăng ký</p>
                  <p className="font-semibold">{userInfo.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {userInfo.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bank Account */}
        <FormField
          control={form.control}
          name="bankAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Số tài khoản ngân hàng <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Nhập số tài khoản (6-20 chữ số)..."
                    className="pl-10 font-mono"
                    {...field}
                    disabled={isDisabled}
                    maxLength={20}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Số tài khoản ngân hàng để nhận hoa hồng (6-20 chữ số)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bank Name */}
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Ngân hàng <span className="text-red-500">*</span>
              </FormLabel>
              {isViewMode ? (
                <FormControl>
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {field.value || "Chưa chọn ngân hàng"}
                    </span>
                  </div>
                </FormControl>
              ) : (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isDisabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <SelectValue placeholder="Chọn ngân hàng" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {vietnameseBanks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <FormDescription>
                Chọn ngân hàng nơi bạn mở tài khoản
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Commission Rate */}
        <FormField
          control={form.control}
          name="commissionRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tỷ lệ hoa hồng (%) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      type="number"
                      placeholder="10"
                      className="pl-10"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      disabled={isDisabled}
                      min={0}
                      max={100}
                      step={0.1}
                    />
                  </div>
                  {/* Commission Rate Preview */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Hoa hồng từ mỗi giao dịch:
                          </span>
                          <Badge variant="secondary" className="font-bold">
                            {commissionRate}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Ví dụ: Giao dịch 1,000,000₫
                          </span>
                          <span className="font-semibold text-green-600">
                            {((commissionRate / 100) * 1000000).toLocaleString(
                              "vi-VN",
                            )}
                            ₫
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Ví dụ: Giao dịch 5,000,000₫
                          </span>
                          <span className="font-semibold text-green-600">
                            {((commissionRate / 100) * 5000000).toLocaleString(
                              "vi-VN",
                            )}
                            ₫
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FormControl>
              <FormDescription>
                Tỷ lệ hoa hồng bạn nhận được từ mỗi giao dịch (0-100%)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rejection Reason (View mode - if rejected) */}
        {isViewMode && requestStatus === "rejected" && (
          <FormField
            control={form.control}
            name="rejectionReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-4 w-4" />
                  Lý do từ chối
                </FormLabel>
                <FormControl>
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <p className="text-sm text-red-800">
                        {field.value || "Không có lý do được cung cấp"}
                      </p>
                    </CardContent>
                  </Card>
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {/* Rejection Reason Input (Review mode) */}
        {isReviewMode && (
          <FormField
            control={form.control}
            name="rejectionReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lý do từ chối (tùy chọn)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập lý do từ chối yêu cầu (nếu từ chối)..."
                    className="min-h-[100px] resize-none"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Cung cấp lý do nếu bạn từ chối yêu cầu này
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Actions */}
        {!isViewMode && (
          <div className="flex items-center gap-3 pt-4 border-t">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Hủy
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              className="ml-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang xử lý...
                </>
              ) : mode === "create" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Gửi yêu cầu
                </>
              ) : mode === "edit" ? (
                "Cập nhật"
              ) : (
                "Xác nhận"
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CollaboratorRequestForm;
