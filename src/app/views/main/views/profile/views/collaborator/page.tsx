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
import {
  CheckCircle,
  Clock,
  XCircle,
  User,
  CreditCard,
  Percent,
} from "lucide-react";
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
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Đăng ký Cộng tác viên</CardTitle>
        <CardDescription>
          Trở thành cộng tác viên để kiếm thêm thu nhập từ việc bán bản vẽ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bankAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tài khoản ngân hàng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số tài khoản" {...field} />
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
                  <FormLabel>Tên ngân hàng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: Vietcombank, BIDV, ACB..."
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
                  <FormLabel>Tỷ lệ hoa hồng mong muốn (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="10"
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
              className="w-full"
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
  return (
    <Tabs defaultValue="info">
      <TabsList>
        <TabsTrigger value="info">Thông tin cộng tác viên</TabsTrigger>
        <TabsTrigger value="contents">Sản phẩm cộng tác viên</TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="mt-4">
        <Card className="mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Thông tin Cộng tác viên</CardTitle>
            <CardDescription>
              Trạng thái đơn đăng ký cộng tác viên của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Separator />
            {/* Application Info */}
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Thông tin ngân hàng</p>
                  <p className="text-sm text-muted-foreground">
                    {data.bankName} - {data.bankAccount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Percent className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Tỷ lệ hoa hồng</p>
                  <p className="text-sm text-muted-foreground">
                    {data.commissionRate}%
                  </p>
                </div>
              </div>
              {data.approvedBy && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Người duyệt</p>
                    <p className="text-sm text-muted-foreground">
                      {data.approvedBy.username || data.approvedBy.email}
                    </p>
                  </div>
                </div>
              )}
              {data.rejectionReason &&
                data.status === CollaboratorResponseStatus.rejected && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="font-medium text-red-800">Lý do từ chối:</p>
                    <p className="text-sm text-red-600">
                      {data.rejectionReason}
                    </p>
                  </div>
                )}
            </div>
            <Separator />
            {/* Timestamps */}
            <div className="text-sm text-muted-foreground space-y-1">
              {data.createdAt && (
                <p>
                  Ngày gửi đơn:{" "}
                  {formatDistanceToNow(new Date(data.createdAt), {
                    addSuffix: true,
                    locale: vi,
                  })}
                </p>
              )}
              {data.approvedAt && (
                <p>
                  Ngày duyệt:{" "}
                  {formatDistanceToNow(new Date(data.approvedAt), {
                    addSuffix: true,
                    locale: vi,
                  })}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="contents" className="mt-4">
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
    <div className="container mx-auto py-8 px-4">
      {collaboratorMe ? (
        <CollaboratorStatus data={collaboratorMe} />
      ) : (
        <CollaboratorForm />
      )}
    </div>
  );
};

export default Collaborator;
