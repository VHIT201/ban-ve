import { ReactNode } from "react";

interface CopyRightLayoutProps {
  children: ReactNode;
}

const CopyRightLayout = ({ children }: CopyRightLayoutProps) => {
  return <>{children}</>;
};

export default CopyRightLayout;
