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
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  AlertCircle,
  Shield,
  AlertTriangle,
  User as UserIcon,
  FileText,
  Upload,
  X,
  Link as LinkIcon,
  Plus,
  ExternalLink,
} from "lucide-react";
import { CopyrightReportViolationType } from "@/api/models/copyrightReportViolationType";

// Schema validation
const copyrightReportFormSchema = z.object({
  contentId: z
    .string()
    .min(1, "Vui lòng nhập ID nội dung bị báo cáo")
    .length(24, "ID nội dung không hợp lệ (phải có 24 ký tự)"),
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
  isLoading?: boolean;
  error?: string | null;
  onCancel?: () => void;
}

const violationTypeOptions = [
  {
    value: CopyrightReportViolationType.copyright,
    label: "Vi phạm bản quyền",
    description: "Nội dung sao chép, sử dụng trái phép bản quyền",
    icon: Shield,
    color: "text-red-600",
  },
  {
    value: CopyrightReportViolationType.trademark,
    label: "Vi phạm thương hiệu",
    description: "Sử dụng trái phép nhãn hiệu, logo, thương hiệu",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    value: CopyrightReportViolationType.privacy,
    label: "Vi phạm quyền riêng tư",
    description: "Tiết lộ thông tin cá nhân, dữ liệu nhạy cảm",
    icon: UserIcon,
    color: "text-purple-600",
  },
  {
    value: CopyrightReportViolationType.other,
    label: "Vi phạm khác",
    description: "Các loại vi phạm khác không thuộc các mục trên",
    icon: FileText,
    color: "text-gray-600",
  },
];

const CopyRightEditorForm = ({
  mode = "create",
  defaultValues,
  onSubmit,
  isLoading = false,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Content ID */}
        <FormField
          control={form.control}
          name="contentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                ID Nội dung bị báo cáo <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Nhập ID nội dung (24 ký tự)..."
                    className="pl-10 font-mono"
                    {...field}
                    disabled={isLoading || isViewMode}
                    maxLength={24}
                  />
                </div>
              </FormControl>
              <FormDescription>
                ID của nội dung vi phạm bản quyền (24 ký tự ObjectId)
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
              <FormLabel>ID Nội dung gốc (Tùy chọn)</FormLabel>
              <FormControl>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Nhập ID nội dung gốc (nếu có)..."
                    className="pl-10 font-mono"
                    {...field}
                    disabled={isLoading || isViewMode}
                    maxLength={24}
                  />
                </div>
              </FormControl>
              <FormDescription>
                ID của nội dung gốc bị sao chép (nếu có)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Violation Type */}
        <FormField
          control={form.control}
          name="violationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Loại vi phạm <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading || isViewMode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại vi phạm" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {violationTypeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-start gap-2 py-1">
                          <Icon className={`w-4 h-4 mt-0.5 ${option.color}`} />
                          <div className="flex flex-col">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-xs text-gray-500">
                              {option.description}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* Selected Violation Type Preview */}
              {selectedViolationConfig && (
                <Card className="mt-2">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <selectedViolationConfig.icon
                        className={`w-5 h-5 mt-0.5 ${selectedViolationConfig.color}`}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {selectedViolationConfig.label}
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5">
                          {selectedViolationConfig.description}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <FormDescription>
                Chọn loại vi phạm phù hợp với nội dung báo cáo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mô tả chi tiết <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả chi tiết về vi phạm, bao gồm: cách thức vi phạm, thời điểm phát hiện, ảnh hưởng của vi phạm..."
                  className="min-h-[150px] resize-none"
                  {...field}
                  disabled={isLoading || isViewMode}
                />
              </FormControl>
              <FormDescription>
                <div className="flex items-center justify-between">
                  <span>
                    Mô tả càng chi tiết càng giúp quá trình xử lý nhanh hơn
                    (20-2000 ký tự)
                  </span>
                  <Badge
                    variant={
                      field.value.length < 20
                        ? "destructive"
                        : field.value.length > 2000
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {field.value.length}/2000
                  </Badge>
                </div>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Evidence */}
        <FormField
          control={form.control}
          name="evidence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Bằng chứng <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  {/* Add Evidence Input */}
                  {!isViewMode && (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Nhập URL bằng chứng (hình ảnh, video, tài liệu...)"
                          className="pl-10"
                          value={evidenceInput}
                          onChange={(e) => setEvidenceInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddEvidence();
                            }
                          }}
                          disabled={isLoading}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddEvidence}
                        disabled={isLoading || !evidenceInput.trim()}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Thêm
                      </Button>
                    </div>
                  )}

                  {/* Evidence List */}
                  {evidenceList.length > 0 ? (
                    <div className="space-y-2">
                      {evidenceList.map((url, index) => (
                        <Card key={index}>
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-100 shrink-0">
                                <LinkIcon className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline truncate block"
                                >
                                  {url}
                                </a>
                                <div className="flex items-center gap-1 mt-1">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Bằng chứng #{index + 1}
                                  </Badge>
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Xem
                                  </a>
                                </div>
                              </div>
                              {!isViewMode && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveEvidence(index)}
                                  disabled={isLoading}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center text-gray-500">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm">Chưa có bằng chứng nào</p>
                          <p className="text-xs mt-1">
                            Thêm URL hình ảnh, video hoặc tài liệu làm bằng
                            chứng
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                <div className="flex items-center justify-between">
                  <span>
                    Cung cấp URL hình ảnh, video, tài liệu chứng minh vi phạm
                    (1-10 bằng chứng)
                  </span>
                  <Badge
                    variant={
                      evidenceList.length === 0
                        ? "destructive"
                        : evidenceList.length > 10
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {evidenceList.length}/10
                  </Badge>
                </div>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  Đang gửi báo cáo...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Gửi báo cáo vi phạm
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CopyRightEditorForm;
