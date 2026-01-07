import { DashboardCard } from "@/components/admin/dashboard/DashboardCard";

const Dashboard = () => {
  return (
    <div className="mx-auto w-full p-6">
      <h2 className="font-semibold text-3xl mb-8">Dashboard</h2>
      <DashboardCard />
    </div>
  );
};

export default Dashboard;
