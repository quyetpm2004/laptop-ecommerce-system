import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const SidebarProduct = ({ onFilter, currentFilters }) => {
  // Quản lý state dạng mảng để hỗ trợ chọn nhiều
  const [selectedFactories, setSelectedFactories] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedSort, setSelectedSort] = useState(
    currentFilters.sort || "none"
  );

  // Hàm helper để thêm/xóa giá trị trong mảng khi click checkbox
  const toggleItem = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // Ánh xạ label giao diện sang giá trị API
  const mapBrand = (brand) => brand.toUpperCase();

  const mapTarget = (target) => {
    const maps = {
      Gaming: "GAMING",
      "Sinh viên - văn phòng": "SINHVIEN-VANPHONG",
      "Thiết kế đồ họa": "THIET-KE-DO-HOA",
      "Mỏng nhẹ": "MONG-NHE",
      "Doanh nhân": "DOANH-NHAN",
    };
    return maps[target] || target;
  };

  const mapPrice = (price) => {
    const maps = {
      "Dưới 10 triệu": "duoi-10-trieu",
      "Từ 10 - 15 triệu": "10-15-trieu",
      "Từ 15 - 20 triệu": "15-20-trieu",
      "Trên 20 triệu": "tren-20-trieu",
    };
    return maps[price] || price;
  };

  const handleFilterClick = () => {
    // Chuyển mảng thành chuỗi cách nhau bởi dấu phẩy trước khi gửi
    onFilter({
      factory: selectedFactories.join(","),
      target: selectedTargets.join(","),
      price: selectedPrices.join(","),
      sort: selectedSort === "none" ? "" : selectedSort,
    });
  };

  return (
    <aside className="w-full md:w-1/4 space-y-8 text-gray-700">
      <section className="space-y-3">
        <h3 className="font-semibold text-lg uppercase tracking-tight">
          Hãng sản xuất
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {["Apple", "Asus", "Lenovo", "Dell", "LG", "Acer"].map((brand) => {
            const val = mapBrand(brand);
            return (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  className="checked-customize"
                  id={`brand-${brand}`}
                  checked={selectedFactories.includes(val)}
                  onCheckedChange={() =>
                    toggleItem(selectedFactories, setSelectedFactories, val)
                  }
                />
                <Label htmlFor={`brand-${brand}`} className="font-normal">
                  {brand}
                </Label>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-lg uppercase tracking-tight">
          Mục đích sử dụng
        </h3>
        <div className="space-y-2">
          {[
            "Gaming",
            "Sinh viên - văn phòng",
            "Thiết kế đồ họa",
            "Mỏng nhẹ",
            "Doanh nhân",
          ].map((purpose) => {
            const val = mapTarget(purpose);
            return (
              <div key={purpose} className="flex items-center space-x-2">
                <Checkbox
                  className="checked-customize"
                  id={`target-${purpose}`}
                  checked={selectedTargets.includes(val)}
                  onCheckedChange={() =>
                    toggleItem(selectedTargets, setSelectedTargets, val)
                  }
                />
                <Label htmlFor={`target-${purpose}`} className="font-normal">
                  {purpose}
                </Label>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-lg uppercase tracking-tight">
          Mức giá
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Dưới 10 triệu",
            "Từ 10 - 15 triệu",
            "Từ 15 - 20 triệu",
            "Trên 20 triệu",
          ].map((price) => {
            const val = mapPrice(price);
            return (
              <div key={price} className="flex items-center space-x-2">
                <Checkbox
                  className="checked-customize"
                  id={`price-${price}`}
                  checked={selectedPrices.includes(val)}
                  onCheckedChange={() =>
                    toggleItem(selectedPrices, setSelectedPrices, val)
                  }
                />
                <Label
                  htmlFor={`price-${price}`}
                  className="text-xs sm:text-sm font-normal"
                >
                  {price}
                </Label>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold text-lg uppercase tracking-tight">
          Sắp xếp
        </h3>
        <RadioGroup value={selectedSort} onValueChange={setSelectedSort}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              className="radio-customize"
              value="gia-tang-dan"
              id="asc"
            />
            <Label htmlFor="asc" className="font-normal">
              Giá tăng dần
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              className="radio-customize"
              value="gia-giam-dan"
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

      <Button
        onClick={handleFilterClick}
        className="w-full rounded-full border-2 border-lime-400 bg-white text-lime-600 hover:bg-lime-500 hover:text-white font-semibold uppercase py-6"
      >
        Lọc sản phẩm
      </Button>
    </aside>
  );
};

export default SidebarProduct;
