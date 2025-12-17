import Footer from "@/components/client/layout/Footer";
import Header from "@/components/client/layout/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
