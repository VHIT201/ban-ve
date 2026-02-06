import { ReactNode } from "react";

interface PaymentLayoutProps {
  children: ReactNode;
}

const PaymentLayout = ({ children }: PaymentLayoutProps) => {
  return <>{children}</>;
};

export default PaymentLayout;
