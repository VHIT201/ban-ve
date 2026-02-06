"use client";

import { ReactNode } from "react";
import { Footer, Header } from "./components";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Main;
