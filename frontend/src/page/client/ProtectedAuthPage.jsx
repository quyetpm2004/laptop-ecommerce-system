import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { TriangleAlertIcon } from "lucide-react";
import Header from "@/components/client/layout/Header";
import Footer from "@/components/client/layout/Footer";

const ProtectedAuthPage = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="text-center">
          <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold">403 Forbidden</h1>
          <p className="mt-4 text-muted-foreground">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ProtectedAuthPage;
