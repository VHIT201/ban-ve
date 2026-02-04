import { ReactNode } from "react";

interface ContentsLayoutProps {
  children: ReactNode;
}

const ContentsLayout = ({ children }: ContentsLayoutProps) => {
  return <>{children}</>;
};

export default ContentsLayout;
