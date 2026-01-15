// Core
import { useEffect, useMemo, useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  AlertCircle,
  Shield,
  AlertTriangle,
  User as UserIcon,
  FileText,
  Upload,
  X,
  Link2 as LinkIcon,
  Plus,
  ExternalLink,
  Copy,
  Info,
  MailIcon,
} from "lucide-react";
import { CopyrightReportViolationType } from "@/api/models/copyrightReportViolationType";
import { EnvelopeIcon } from "@phosphor-icons/react";

// Schema validation
const copyrightReportFormSchema = z.object({
  contentId: z
    .string()
    .min(1, "Vui lòng nhập ID nội dung bị báo cáo")
    .length(24, "ID nội dung không hợp lệ (phải có 24 ký tự)"),
  email: z.string().email("Email không hợp lệ"),
  reportedContentId: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length === 0 || val.length === 24,
      "ID nội dung gốc không hợp lệ (phải có 24 ký tự)"
    ),
  violationType: z.nativeEnum(CopyrightReportViolationType, {
    required_error: "Vui lòng chọn loại vi phạm",
    invalid_type_error: "Loại vi phạm không hợp lệ",
  }),
  description: z
    .string()
    .min(20, "Mô tả phải có ít nhất 20 ký tự")
    .max(2000, "Mô tả không được vượt quá 2000 ký tự"),
  evidence: z
    .array(z.string().url("URL bằng chứng không hợp lệ"))
    .min(1, "Vui lòng cung cấp ít nhất 1 bằng chứng")
    .max(10, "Không được vượt quá 10 bằng chứng"),
});

export type CopyrightReportFormValues = z.infer<
  typeof copyrightReportFormSchema
>;

interface CopyrightReportEditorFormProps {
  mode?: "create" | "view";
  defaultValues?: Partial<CopyrightReportFormValues>;
  onSubmit: (values: CopyrightReportFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  onCancel?: () => void;
}

const violationTypeOptions = [
  {
    value: CopyrightReportViolationType.copyright,
    label: "Bản quyền",
    description: "Sao chép, sử dụng trái phép nội dung có bản quyền",
    icon: Shield,
    gradient: "from-red-50 to-red-100",
    iconColor: "text-red-600",
  },
  {
    value: CopyrightReportViolationType.trademark,
    label: "Thương hiệu",
    description: "Sử dụng trái phép nhãn hiệu, logo thương hiệu",
    icon: AlertTriangle,
    gradient: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
  },
  {
    value: CopyrightReportViolationType.privacy,
    label: "Quyền riêng tư",
    description: "Tiết lộ thông tin cá nhân, dữ liệu nhạy cảm",
    icon: UserIcon,
    gradient: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
  },
  {
    value: CopyrightReportViolationType.other,
    label: "Khác",
    description: "Các vi phạm khác không thuộc danh mục trên",
    icon: FileText,
    gradient: "from-gray-50 to-gray-100",
    iconColor: "text-gray-600",
  },
];

const CopyRightEditorForm = ({
  mode = "create",
  defaultValues,
  onSubmit,
  loading = false,
  error = null,
  onCancel,
}: CopyrightReportEditorFormProps) => {
  const [evidenceInput, setEvidenceInput] = useState("");

  // Initialize form
  const form = useForm<CopyrightReportFormValues>({
    resolver: zodResolver(copyrightReportFormSchema),
    defaultValues: {
      contentId: defaultValues?.contentId || "",
      reportedContentId: defaultValues?.reportedContentId || "",
      violationType:
        defaultValues?.violationType || CopyrightReportViolationType.copyright,
      description: defaultValues?.description || "",
      evidence: defaultValues?.evidence || [],
    },
  });

  // Watch values
  const selectedViolationType = form.watch("violationType");
  const evidenceList = form.watch("evidence");

  // Reset form when mode changes
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        contentId: defaultValues.contentId || "",
        reportedContentId: defaultValues.reportedContentId || "",
        violationType:
          defaultValues.violationType || CopyrightReportViolationType.copyright,
        description: defaultValues.description || "",
        evidence: defaultValues.evidence || [],
      });
    }
  }, [defaultValues, form, mode]);

  // Get selected violation type config
  const selectedViolationConfig = useMemo(
    () =>
      violationTypeOptions.find((opt) => opt.value === selectedViolationType) ||
      violationTypeOptions[0],
    [selectedViolationType]
  );

  // Add evidence URL
  const handleAddEvidence = () => {
    if (!evidenceInput.trim()) return;

    try {
      new URL(evidenceInput); // Validate URL
      const currentEvidence = form.getValues("evidence");
      if (!currentEvidence.includes(evidenceInput)) {
        form.setValue("evidence", [...currentEvidence, evidenceInput], {
          shouldValidate: true,
        });
        setEvidenceInput("");
      }
    } catch {
      form.setError("evidence", {
        type: "manual",
        message: "URL không hợp lệ",
      });
    }
  };

  // Remove evidence URL
  const handleRemoveEvidence = (index: number) => {
    const currentEvidence = form.getValues("evidence");
    form.setValue(
      "evidence",
      currentEvidence.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const handleSubmit = async (values: CopyrightReportFormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isViewMode = mode === "view";

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-sm p-0">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-lg font-semibold text-destructive">
                {isViewMode
                  ? "Chi tiết báo cáo vi phạm"
                  : "Báo cáo vi phạm bản quyền"}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {isViewMode
                  ? "Thông tin chi tiết về báo cáo vi phạm"
                  : "Điền thông tin để báo cáo nội dung vi phạm bản quyền"}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 px-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              {/* Error Alert */}
              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Content Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-500 "></div>
                  <h3 className="text-base font-medium text-gray-900">
                    Thông tin nội dung
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Content ID */}
                  <FormField
                    control={form.control}
                    name="contentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          ID nội dung vi phạm
                          <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Nhập ID nội dung (24 ký tự)"
                              className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 font-mono text-sm"
                              {...field}
                              disabled={loading || isViewMode}
                              maxLength={24}
                            />
                            {field.value && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-2"
                                onClick={() =>
                                  navigator.clipboard.writeText(field.value)
                                }
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          ID của nội dung bị báo cáo vi phạm
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Reported Content ID (Optional) */}
                  <FormField
                    control={form.control}
                    name="reportedContentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          ID nội dung gốc
                          <span className="text-gray-400 ml-1">(Tùy chọn)</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Nhập ID nội dung gốc"
                              className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 font-mono text-sm"
                              {...field}
                              disabled={loading || isViewMode}
                              maxLength={24}
                            />
                            {field.value && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-2"
                                onClick={() =>
                                  navigator.clipboard.writeText(field.value)
                                }
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          ID của nội dung gốc bị sao chép (nếu có)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email liên hệ
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Nhập email liên hệ"
                            className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 font-mono text-sm"
                            {...field}
                            disabled={loading || isViewMode}
                            maxLength={24}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-8" />

              {/* Violation Type Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-500 "></div>
                  <h3 className="text-base font-medium text-gray-900">
                    Loại vi phạm
                  </h3>
                </div>

                <FormField
                  control={form.control}
                  name="violationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Chọn loại vi phạm
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loading || isViewMode}
                      >
                        <FormControl>
                          <SelectTrigger className="h-14! border-gray-200 focus:border-red-500 focus:ring-red-500/20 w-full">
                            <SelectValue placeholder="Chọn loại vi phạm phù hợp" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="p-2">
                          {violationTypeOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="p-3 cursor-pointer hover:bg-gray-50 rounded-lg mb-1 last:mb-0"
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`p-2 rounded-lg bg-gradient-to-r ${option.gradient} flex items-center justify-center mt-1`}
                                  >
                                    <Icon
                                      className={`w-4 h-4 ${option.iconColor}`}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-gray-900 text-left">
                                      {option.label}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                      {option.description}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      {/* Selected Violation Type Preview */}
                      {selectedViolationConfig && (
                        <Card className="mt-4 border-gray-200 shadow-none">
                          <CardContent className="px-2">
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg bg-gradient-to-r ${selectedViolationConfig.gradient}`}
                              >
                                <selectedViolationConfig.icon
                                  className={`w-5 h-5 ${selectedViolationConfig.iconColor}`}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm text-gray-900 mb-1">
                                  Vi phạm {selectedViolationConfig.label}
                                </div>
                                <div className="text-xs text-gray-600 leading-relaxed">
                                  {selectedViolationConfig.description}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <FormDescription className="text-xs text-gray-500 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Chọn loại vi phạm phù hợp nhất với tình huống
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-8" />

              {/* Description Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-500 "></div>
                  <h3 className="text-base font-medium text-gray-900">
                    Mô tả chi tiết
                  </h3>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Mô tả về vi phạm
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Mô tả chi tiết về vi phạm bao gồm:
• Cách thức vi phạm cụ thể
• Thời điểm phát hiện vi phạm  
• Ảnh hưởng của vi phạm
• Các chi tiết khác giúp làm rõ vấn đề"
                            className="min-h-[140px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm leading-relaxed"
                            {...field}
                            disabled={loading || isViewMode}
                          />
                          <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <Badge
                              variant={
                                field.value.length < 20
                                  ? "destructive"
                                  : field.value.length > 2000
                                  ? "destructive"
                                  : field.value.length > 1500
                                  ? "secondary"
                                  : "outline"
                              }
                              className="text-xs"
                            >
                              {field.value.length}/2000
                            </Badge>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Mô tả càng chi tiết càng giúp quá trình xử lý diễn ra
                        nhanh chóng và chính xác
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-8" />

              {/* Evidence Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-500 "></div>
                  <h3 className="text-base font-medium text-gray-900">
                    Bằng chứng
                  </h3>
                </div>

                <FormField
                  control={form.control}
                  name="evidence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        URL bằng chứng
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {/* Add Evidence Input */}
                          {!isViewMode && (
                            <div className="flex gap-3">
                              <div className="relative flex-1">
                                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="Nhập URL hình ảnh, video, tài liệu làm bằng chứng"
                                  className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                  value={evidenceInput}
                                  onChange={(e) =>
                                    setEvidenceInput(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      handleAddEvidence();
                                    }
                                  }}
                                  disabled={loading}
                                />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                className="h-11 px-4 border-gray-200 hover:bg-purple-50 hover:border-purple-300"
                                onClick={handleAddEvidence}
                                disabled={loading || !evidenceInput.trim()}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm
                              </Button>
                            </div>
                          )}

                          {/* Evidence List */}
                          {evidenceList.length > 0 ? (
                            <div className="space-y-3">
                              {evidenceList.map((url, index) => (
                                <Card
                                  key={index}
                                  className="border-gray-200 shadow-none hover:shadow-sm transition-shadow"
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 shrink-0">
                                        <LinkIcon className="w-4 h-4 text-blue-600" />
                                      </div>
                                      <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex items-center justify-between">
                                          <Badge
                                            variant="secondary"
                                            className="text-xs px-2 py-1"
                                          >
                                            Bằng chứng #{index + 1}
                                          </Badge>
                                          {!isViewMode && (
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                              onClick={() =>
                                                handleRemoveEvidence(index)
                                              }
                                              disabled={loading}
                                            >
                                              <X className="w-4 h-4" />
                                            </Button>
                                          )}
                                        </div>
                                        <a
                                          href={url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate block transition-colors"
                                        >
                                          {url}
                                        </a>
                                        <div className="flex items-center gap-3">
                                          <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                                          >
                                            <ExternalLink className="w-3 h-3" />
                                            Xem bằng chứng
                                          </a>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                                            onClick={() =>
                                              navigator.clipboard.writeText(url)
                                            }
                                          >
                                            <Copy className="w-3 h-3 mr-1" />
                                            Sao chép
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <Card className="border-gray-200 border-dashed">
                              <CardContent className="p-8">
                                <div className="text-center">
                                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <p className="text-sm font-medium text-gray-900 mb-1">
                                    Chưa có bằng chứng
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Thêm URL hình ảnh, video hoặc tài liệu chứng
                                    minh vi phạm
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Cần ít nhất 1 bằng chứng để hoàn tất báo cáo
                        </span>
                        <Badge
                          variant={
                            evidenceList.length === 0
                              ? "destructive"
                              : evidenceList.length > 10
                              ? "destructive"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {evidenceList.length}/10
                        </Badge>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Actions */}
              {!isViewMode && (
                <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500 max-w-[50%]">
                    <Info className="w-3 h-3" />
                    <span>
                      Tất cả thông tin sẽ được bảo mật và chỉ dùng để xử lý báo
                      cáo
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {onCancel && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="px-6"
                        onClick={onCancel}
                        disabled={loading}
                      >
                        Hủy bỏ
                      </Button>
                    )}
                    <Button
                      type="submit"
                      variant="destructive"
                      className="px-8 h-11 font-medium"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Đang gửi báo cáo...
                        </>
                      ) : (
                        <>Gửi báo cáo vi phạm</>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CopyRightEditorForm;
