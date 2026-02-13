"use client";

import { ReactNode } from "react";
import { Footer, Header } from "./components";
import { ScrollToTop } from "../components";
import { ButtonScrollToTop } from "@/components/shared";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <ProgressBar
        height="3px"
        color="#29D"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Header />
      <main>{children}</main>
      <Footer />
      <ButtonScrollToTop />
    </div>
  );
};

export default Main;
