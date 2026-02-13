"use client";

import { ReactNode } from "react";
import { Footer, Header } from "./components";
import { ScrollToTop } from "../components";
import { ButtonScrollToTop } from "@/components/shared";
import NextNProgress from "nextjs-progressbar";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <NextNProgress />
      <Header />
      <main>{children}</main>
      <Footer />
      <ButtonScrollToTop />
    </div>
  );
};

export default Main;
