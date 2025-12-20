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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { User, CreditCard, Percent } from "lucide-react";
import React, { useMemo } from "react";
import { QueryData } from "@/api/types/base";
import { UseQueryResult } from "@tanstack/react-query";
import { CollaboratorMe } from "@/api/types/collaborator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollaboratorContents } from "./components";

const collaboratorApplySchema = z.object({
  bankAccount: z
    .string()
    .min(1, "Vui lòng nhập số tài khoản")
    .regex(/^[0-9]+$/, "Số tài khoản chỉ được chứa số"),
  bankName: z.string().min(1, "Vui lòng nhập tên ngân hàng"),
  commissionRate: z
    .number()
    .min(0, "Tỷ lệ hoa hồng tối thiểu là 0%")
    .max(100, "Tỷ lệ hoa hồng tối đa là 100%"),
});

function CollaboratorForm() {
  const applyMutation = usePostApiCollaboratorsApply();

  const form = useForm<CollaboratorApplyInput>({
    resolver: zodResolver(collaboratorApplySchema),
    defaultValues: {
      bankAccount: "",
      bankName: "",
      commissionRate: 10,
    },
  });

  const onSubmit = (data: CollaboratorApplyInput) => {
    applyMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast.success("Đã gửi đơn đăng ký thành công!");
          form.reset();
        },
        onError: () => {
          toast.error(`Gửi đơn thất bại`);
        },
      }
    );
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100 pb-6">
        <CardTitle className="text-xl font-bold text-gray-900">
          Đăng ký Cộng tác viên
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Trở thành cộng tác viên để kiếm thêm thu nhập từ việc bán bản vẽ
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Tên ngân hàng
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: Vietcombank, BIDV, ACB..."
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

function CollaboratorStatus({ data }: { data: any }) {
  const getStatusBadge = (status: CollaboratorResponseStatus) => {
    switch (status) {
      case CollaboratorResponseStatus.approved:
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Đã duyệt
          </Badge>
        );
      case CollaboratorResponseStatus.rejected:
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Đã từ chối
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Chờ duyệt
          </Badge>
        );
    }
  };

  return (
    <Tabs defaultValue="info" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 h-11">
        <TabsTrigger value="info">Thông tin</TabsTrigger>
        <TabsTrigger value="contents">Sản phẩm</TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-6">
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
              {getStatusBadge(data.status)}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {/* Bank Info */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
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
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
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

              {/* Approver */}
              {data.approvedBy && (
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
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
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
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

      <TabsContent value="contents">
        <CollaboratorContents />
      </TabsContent>
    </Tabs>
  );
}

const Collaborator = () => {
  const getCollaboratorMeQuery = useGetApiCollaboratorsMe({
    query: {
      select: (data) =>
        (data as unknown as QueryData<CollaboratorMe>).responseData,
    },
  }) as UseQueryResult<CollaboratorMe>;

  const collaboratorMe = useMemo(() => {
    return getCollaboratorMeQuery.data;
  }, [getCollaboratorMeQuery.data]);

  return (
    <div className="space-y-6">
      {collaboratorMe ? (
        <CollaboratorStatus data={collaboratorMe} />
      ) : (
        <CollaboratorForm />
      )}
    </div>
  );
};

export default Collaborator;
