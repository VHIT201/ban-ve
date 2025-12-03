// Core
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

// App
import queryClient from "@/configs/query-client";
import { AuthGate } from "@/components/modules/auth";
import { ScrollToTop } from "./components";
import { Fragment } from "react/jsx-runtime";

// Component
const App = () => {
  return (
    <Fragment>
      <ScrollToTop />
      <Toaster richColors position="bottom-right" />
      <QueryClientProvider client={queryClient}>
        <AuthGate>
          <Outlet />
        </AuthGate>
      </QueryClientProvider>
    </Fragment>
  );
};

export default App;
