import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { TriangleAlertIcon } from "lucide-react";

export default function AdminLayout() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || user.role !== "ADMIN") {
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
    <SidebarProvider>
      <AppSidebar />
      <main className="mx-auto w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
