import { Toaster } from "@/components/ui/sonner";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="min-h-screen bg-background">
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: {
            marginTop: "80px",
            marginRight: "20px",
          },
          className: "mt-20",
        }}
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
