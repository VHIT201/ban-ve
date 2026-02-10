import { usePostApiOrders } from "@/api/endpoints/orders";
import { usePostApiPaymentsSepayCreateQrPayment } from "@/api/endpoints/payments";
import { Order } from "@/api/models";
import { ResponseData } from "@/api/types/base";
import {
  CreateQRPaymentResponse,
  SSEPaymentMessage,
} from "@/api/types/payments";
import baseConfig from "@/configs/base";
import { PaymentMethod, PaymentStatus } from "@/enums/payment";
import useSSEStream from "@/hooks/use-sse-stream";
import { usePaymentStore } from "@/stores";
import { OrderItem } from "@/types/order";
import { extractErrorMessage } from "@/utils/error";
import { isUndefined } from "lodash-es";
import { useMemo, useState, useCallback } from "react";
import { toast } from "sonner";

// Types
interface Props {
  orders: OrderItem[];
  onConnect?: () => void;
}

interface PaymentQR {
  url: string;
  sseClientId: string;
  paymentId: string;
}

// Custom Hook
const useCreateQRPayment = (props: Props) => {
  // Props
  const { orders, onConnect } = props;

  // States
  const [orderPayment, setOrderPayment] = useState<Order | undefined>(
    undefined,
  );
  const [paymentQR, setPaymentQR] = useState<PaymentQR | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamingStatus, setStreamingStatus] = useState<PaymentStatus>(
    PaymentStatus.PENDING,
  );

  // Methods
  const handlePaymentSSEEvent = useCallback(
    (data: SSEPaymentMessage) => {
      if (data.status === PaymentStatus.PENDING) {
        onConnect?.();
        setIsStreaming(true);
      } else if (data.status === PaymentStatus.COMPLETED) {
        setIsStreaming(false);
      }
      setStreamingStatus(data.status);
    },
    [onConnect],
  );

  // Mutations
  const createOrderMutation = usePostApiOrders();
  const createPaymentQRMutation = usePostApiPaymentsSepayCreateQrPayment();

  // Methods
  const handleCreatePaymentQR = async (email: string) => {
    try {
      const paymentStore = usePaymentStore.getState();

      const existsOrder = paymentStore.findExistsOrder({
        items: orders as any[],
        paymentMethod: PaymentMethod.SEPAY,
      });

      if (!isUndefined(existsOrder)) {
        setPaymentQR({
          url: existsOrder.paymentId,
          sseClientId: existsOrder.sseClientId,
          paymentId: existsOrder.paymentId,
        });
        return;
      }

      const createOrderRes = await createOrderMutation.mutateAsync({
        data: {
          email: email,
          items: orders,
          paymentMethod: PaymentMethod.SEPAY,
        },
      });

      const createOrderData = (createOrderRes as unknown as ResponseData<Order>)
        .data;

      if (!createOrderData) {
        toast.error(
          extractErrorMessage(createOrderMutation.error) ||
            "Tạo đơn hàng thất bại.",
        );
        throw new Error("Tạo đơn hàng thất bại.");
      }

      const createPaymentQRRes = await createPaymentQRMutation.mutateAsync({
        data: {
          email: email,
          orderId: createOrderData._id!,
        },
      });

      const paymentQRData =
        createPaymentQRRes as unknown as CreateQRPaymentResponse;

      paymentStore.createPayment({
        sseClientId: paymentQRData.sseClientId,
        paymentId: paymentQRData.paymentId,
        order: createOrderData,
      });

      setOrderPayment(createOrderData);

      setPaymentQR({
        url: paymentQRData.qrUrl,
        sseClientId: paymentQRData.sseClientId,
        paymentId: paymentQRData.paymentId,
      });
    } catch (error) {
      toast.warning(
        extractErrorMessage(error) ||
          "Tạo đơn thanh toán thất bại. Vui lòng thử lại.",
      );
    }
  };

  // Stream SSE Payment
  const handleSSEEvent = useCallback(
    (event: string, data: SSEPaymentMessage) => {
      if (event === "payment_status") {
        handlePaymentSSEEvent(data);
      }
    },
    [handlePaymentSSEEvent],
  );

  useSSEStream({
    enable:
      Boolean(paymentQR?.paymentId) &&
      Boolean(paymentQR?.sseClientId) &&
      Boolean(orderPayment?.orderCode),
    url: `${baseConfig.backendDomain}api/sse/connect?sseClientId=${paymentQR?.sseClientId}&paymentId=${paymentQR?.paymentId}&orderCode=${orderPayment?.orderCode}`,
    onEvent: handleSSEEvent,
  });

  const isIdle = useMemo(
    () => createOrderMutation.isIdle && createPaymentQRMutation.isIdle,
    [createOrderMutation.isIdle, createPaymentQRMutation.isIdle],
  );

  const isPending = useMemo(
    () => createOrderMutation.isPending || createPaymentQRMutation.isPending,
    [createOrderMutation.isPending, createPaymentQRMutation.isPending],
  );

  const isError = useMemo(
    () => createOrderMutation.isError || createPaymentQRMutation.isError,
    [createOrderMutation.isError, createPaymentQRMutation.isError],
  );

  return useMemo(
    () => ({
      isIdle,
      isError,
      isPending,
      isStreaming,
      streamingStatus,
      order: orderPayment,
      qrCodeUrl: paymentQR?.url,
      createPaymentQR: handleCreatePaymentQR,
    }),
    [
      isIdle,
      isError,
      isPending,
      paymentQR,
      isStreaming,
      streamingStatus,
      orderPayment,
      handleCreatePaymentQR,
    ],
  );
};

export default useCreateQRPayment;
