import { ReactNode } from "react";

interface CollaboratorLayoutProps {
  children: ReactNode;
}

const CollaboratorLayout = ({ children }: CollaboratorLayoutProps) => {
  return <>{children}</>;
};

export default CollaboratorLayout;
