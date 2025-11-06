// Core
import "@github/spark/spark";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// App
import { ErrorFallback } from "@/ErrorFallback";
import queryClient from "@/configs/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Toaster richColors position="bottom-right" />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
