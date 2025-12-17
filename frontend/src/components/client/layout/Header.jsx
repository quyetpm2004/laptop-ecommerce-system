import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, Voicemail } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-white shadow-xs bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center bg-lime-500 rounded-tl-[100px] rounded-tr-[100px] rounded-br-[40px] rounded-bl-[40px]">
        <div className="text-orange-400">
          <Voicemail className="w-[20px]" />
        </div>
        <div className="text-sm flex space-x-4">
          <a href="#">Điều khoản sử dụng</a>
          <span className="text-lime-300">/</span>
          <a href="#">Hỗ trợ</a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center bg-white text-gray-800 h-[80px]">
        <div className="flex items-center space-x-8 flex-1">
          <h1 className="text-4xl font-semibold text-lime-600">Laptopshop</h1>

          <nav className="hidden md:flex space-x-6 flex-1 justify-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-lime-600 font-semibold"
                  : "text-gray-700 hover:text-lime-600"
              }
            >
              Trang chủ
            </NavLink>

            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "text-lime-600 font-semibold "
                  : "text-gray-700 hover:text-lime-600"
              }
            >
              Sản phẩm
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              1
            </span>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-gray-600" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
