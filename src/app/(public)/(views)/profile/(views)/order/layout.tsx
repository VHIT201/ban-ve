import { ReactNode } from "react";

interface OrderLayoutProps {
  children: ReactNode;
}

const OrderLayout = ({ children }: OrderLayoutProps) => {
  return <>{children}</>;
};

export default OrderLayout;
