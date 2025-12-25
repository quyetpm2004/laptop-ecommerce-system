import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ShoppingCart,
  User,
  Menu,
  Voicemail,
  LogOut,
  UserCircle,
  Settings,
  X,
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="text-white shadow-sm bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center bg-lime-500 rounded-tl-[100px] rounded-tr-[100px] rounded-br-[40px] rounded-bl-[40px] hidden md:flex">
        <div className="text-orange-100 flex items-center gap-2">
          <Voicemail className="w-4 h-4" />
          <span className="text-xs italic text-white">
            Laptopshop - High performance laptops
          </span>
        </div>
        <div className="text-xs flex space-x-4">
          <a href="#" className="hover:text-lime-100">
            Điều khoản
          </a>
          <span className="text-lime-300">/</span>
          <a href="#" className="hover:text-lime-100">
            Hỗ trợ
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center bg-white text-gray-800 h-[70px] md:h-[80px]">
        <div className="flex flex-1 items-center space-x-8">
          <Link
            to="/"
            className="text-3xl md:text-4xl font-semibold text-lime-600"
          >
            Laptopshop
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
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
                  ? "text-lime-600 font-semibold"
                  : "text-gray-700 hover:text-lime-600"
              }
            >
              Sản phẩm
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Giỏ hàng (Ẩn nếu chưa login) */}
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Link>
            </Button>
          )}

          {/* User Section (Dropdown trên Desktop) */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-gray-100"
                  >
                    <User className="h-5 w-5 text-lime-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer"
                  >
                    <UserCircle className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-4">
                <Button
                  variant="outline"
                  className="rounded-full border-lime-600 text-lime-600 hover:bg-lime-50"
                  asChild
                >
                  <Link to="/login">Đăng nhập</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-lime-600 text-lime-600 hover:bg-lime-50"
                  asChild
                >
                  <Link to="/register">Đăng ký</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Nút Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] z-40 bg-white md:hidden flex flex-col p-6 animate-in slide-in-from-right duration-300">
          <nav className="flex flex-col space-y-6 text-lg font-medium">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Trang chủ
            </Link>
            <Link to="/product" onClick={() => setIsMobileMenuOpen(false)}>
              Sản phẩm
            </Link>
            <hr />
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserCircle className="mr-3" /> Hồ sơ cá nhân
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="mr-3" /> Giỏ hàng
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-500 text-left pt-4"
                >
                  <LogOut className="mr-3" /> Đăng xuất
                </button>
              </>
            ) : (
              <Button
                className="bg-lime-600 w-full py-6 text-lg"
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/login">Đăng nhập ngay</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
