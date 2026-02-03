// Core
import { RouteObject } from "react-router-dom";

// App
import { ROUTE_PATHS } from "@/constants/paths";

// Content route paths
const {
  admin: { payments },
} = ROUTE_PATHS;

// Content routes
const paymentRoutes: RouteObject = {
  path: payments.path,
  lazy: async () => {
    const { default: Payment } = await import("../layout");
    return {
      element: <Payment />,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: PaymentHistory } = await import(
          "../views/payment-history/page"
        );
        return {
          element: <PaymentHistory />,
        };
      },
    },
    {
      path: ":id",
      lazy: async () => {
        const { default: PaymentDetailPage } = await import(
          "../views/payment-detail/PaymentDetailPage"
        );
        return {
          element: <PaymentDetailPage />,
        };
      },
    },
  ],
};

export default paymentRoutes;
