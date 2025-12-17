import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const SidebarProduct = () => {
  return (
    <aside className="w-full md:w-1/4 space-y-8 text-gray-700">
      {/* Hãng sản xuất */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg uppercase tracking-tight">
          Hãng sản xuất
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {["Apple", "Asus", "Lenovo", "Dell", "LG", "Acer"].map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox className="checked-customize" id={brand} />
              <Label htmlFor={brand} className="font-normal">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </section>

      {/* Mục đích sử dụng */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg uppercase tracking-tight">
          Mục đích sử dụng
        </h3>
        <div className="space-y-2">
          {[
            "Gaming",
            "Sinh viên - văn phòng",
            "Thiết kế đồ họa",
            "Mỏng nhẹ",
            "Doanh nhân",
          ].map((purpose) => (
            <div key={purpose} className="flex items-center space-x-2">
              <Checkbox className="checked-customize" id={purpose} />
              <Label htmlFor={purpose} className="font-normal">
                {purpose}
              </Label>
            </div>
          ))}
        </div>
      </section>

      {/* Mức giá */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg uppercase tracking-tight">Mức giá</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Dưới 10 triệu",
            "Từ 10 - 15 triệu",
            "Từ 15 - 20 triệu",
            "Trên 20 triệu",
          ].map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <Checkbox className="checked-customize" id={price} />
              <Label htmlFor={price} className="text-xs sm:text-sm font-normal">
                {price}
              </Label>
            </div>
          ))}
        </div>
      </section>

      {/* Sắp xếp */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg uppercase tracking-tight">Sắp xếp</h3>
        <RadioGroup defaultValue="none">
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="radio-customize" value="asc" id="asc" />
            <Label htmlFor="asc" className="font-normal">
              Giá tăng dần
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              className="radio-customize"
              value="desc"
              id="desc"
            />
            <Label htmlFor="desc" className="font-normal">
              Giá giảm dần
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              className="radio-customize"
              value="none"
              id="none"
            />
            <Label htmlFor="none" className="font-normal">
              Không sắp xếp
            </Label>
          </div>
        </RadioGroup>
      </section>

      <Button className="w-full rounded-full border-2 border-lime-400 bg-white text-lime-600 hover:bg-lime-500 hover:text-white font-semibold uppercase py-6">
        Lọc sản phẩm
      </Button>
    </aside>
  );
};

export default SidebarProduct;
