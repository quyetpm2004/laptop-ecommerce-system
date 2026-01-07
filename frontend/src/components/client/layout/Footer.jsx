// src/components/Footer.jsx
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 pt-12 pb-4 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Phần Logo và Slogan */}
        <div className="mb-8">
          <h2 className="text-5xl font-semibold text-lime-500">Laptopshop</h2>
          <p className="mt-1 text-sm text-lime-500">@quyetpm2004</p>
        </div>

        <Separator className="bg-gray-600 mb-8" />

        {/* Các cột thông tin */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Cột 1: Slogan */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Chất lượng là ưu tiên hàng đầu
            </h3>
          </div>

          {/* Cột 2: Shop Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Shop Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Account */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  My Account
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              <p>Address: 1429 Netus Rd, NY 48247</p>
              <p>Email: phammanhquyetx9@gmail.com</p>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-600 mb-4" />

        {/* Copyright và Designed By */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© quyetpm2004. All right reserved.</p>
          <p>
            Designed by{" "}
            <a href="#" className="underline hover:text-white">
              Reactjs
            </a>{" "}
            Distributed By{" "}
            <a href="#" className="underline hover:text-white">
              quyetpm2004
            </a>
          </p>
        </div>
      </div>

      {/* Nút cuộn lên đầu trang */}
      <Button
        size="icon"
        className="absolute bottom-4 right-4 bg-lime-500 hover:bg-lime-600 rounded-full shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="text-xl">↑</span>
      </Button>
    </footer>
  );
};

export default Footer;
