import { ReactNode } from "react";

interface CategoriesLayoutProps {
  children: ReactNode;
}

const CategoriesLayout = ({ children }: CategoriesLayoutProps) => {
  return <>{children}</>;
};

export default CategoriesLayout;
