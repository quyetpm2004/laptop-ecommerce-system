// src/components/HeroSection.jsx
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroImages = [
  {
    src: "/image/banner/hero-img-1.png",
    label: "Laptop",
  },
  {
    src: "/image/banner/hero-img-2.png",
    label: "Gaming",
  },
  {
    src: "/image/banner/hero-img-3.png",
    label: "Phụ kiện",
  },
];

const HeroSection = () => {
  return (
    <section className="hero-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center py-16 md:py-24">
        {/* Bên trái */}
        <div className="md:w-1/2 space-y-4 mb-8 md:mb-0">
          <p className="text-xl font-semibold text-orange-500">
            100% Sản Phẩm Chính Hãng
          </p>
          <h2 className="text-6xl font-semibold text-lime-600 leading-tight">
            Hàng cao cấp, rẻ vô địch
          </h2>
        </div>

        {/* Bên phải – Carousel */}
        <div className="md:w-1/2 flex justify-center relative">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              {heroImages.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="relative bg-white rounded-lg">
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-72 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />

                    {/* Badge */}
                    <span className="absolute top-4 left-4 px-4 py-2 bg-yellow-300 text-white font-semibold rounded-md shadow-lg">
                      {item.label}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Nút điều hướng */}
            <CarouselPrevious className="-left-12 bg-lime-500 hover:bg-lime-600 text-white" />
            <CarouselNext className="-right-12 bg-lime-500 hover:bg-lime-600 text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
