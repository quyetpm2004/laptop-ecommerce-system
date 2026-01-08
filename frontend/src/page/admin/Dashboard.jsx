import { DashboardCard } from "@/components/admin/dashboard/DashboardCard";
import { getDashboard } from "@/service/dashboard.api";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboard();
      if (res.success) {
        setStats(res.data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mx-auto w-full p-6">
      <h2 className="font-semibold text-3xl mb-8">Dashboard</h2>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <DashboardCard
          title={"User"}
          count={stats?.userCount ?? 0}
          url={"/admin/user"}
        />
        <DashboardCard
          title={"Product "}
          count={stats?.productCount ?? 0}
          url={"/admin/product"}
        />
        <DashboardCard
          title={"Order"}
          count={stats?.orderCount ?? 0}
          url={"/admin/order"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
