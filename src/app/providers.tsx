"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthSync } from "@/components/auth";
import queryClient from "@/configs/query-client";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthSync />
      {children}
    </QueryClientProvider>
  );
}
