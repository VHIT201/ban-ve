import z from "zod";

export const PAYMENT_STATUS_OPTIONS = [
  { label: "Tất cả trạng thái", value: "all" },
  { label: "Đang xử lý", value: "pending" },
  { label: "Thành công", value: "completed" },
  { label: "Thất bại", value: "failed" },
  { label: "Đã hủy", value: "cancelled" },
];

// Filter Schema
const PAYMENT_FILTER_SCHEMA = z.object({
  status: z
    .enum(["all", "pending", "completed", "failed", "cancelled"])
    .optional(),
  orderCode: z.string().optional(),
  email: z.string().optional(),
});

type PaymentFilterSchema = z.infer<typeof PAYMENT_FILTER_SCHEMA>;

export { PAYMENT_FILTER_SCHEMA };
export type { PaymentFilterSchema };
