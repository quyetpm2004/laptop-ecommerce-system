import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";

export default function AdminLayout() {
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
