import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

const CreateProductModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    detailDesc: "",
    shortDesc: "",
    quantity: "",
    factory: "",
    target: "",
    image: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    await onCreate(formData);

    // Reset form sau khi tạo
    setFormData({
      name: "",
      price: "",
      detailDesc: "",
      shortDesc: "",
      quantity: "",
      factory: "",
      target: "",
      image: null,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Row 1: Name & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Laptop Asus TUF Gaming"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="17490000"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả chi tiết sản phẩm..."
              className="min-h-[100px]"
              value={formData.detailDesc}
              onChange={(e) => handleChange("detailDesc", e.target.value)}
            />
          </div>

          {/* Row 3: Short Description & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="shortDesc">Short Description</Label>
              <Input
                id="shortDesc"
                placeholder="Intel, Core i5, 11400H"
                value={formData.shortDesc}
                onChange={(e) => handleChange("shortDesc", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="78"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: Factory & Target */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Factory</Label>
              <Select
                value={formData.factory}
                onValueChange={(value) => handleChange("factory", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select factory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASUS">Asus</SelectItem>
                  <SelectItem value="APPLE">Apple</SelectItem>
                  <SelectItem value="LENOVO">Lenovo</SelectItem>
                  <SelectItem value="DELL">Dell</SelectItem>
                  <SelectItem value="LG">LG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Target</Label>
              <Select
                value={formData.target}
                onValueChange={(value) => handleChange("target", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GAMING">Gaming</SelectItem>
                  <SelectItem value="DOANH-NHAN">Office</SelectItem>
                  <SelectItem value="SINHVIEN-VANPHONG">
                    Sinh viên văn phòng
                  </SelectItem>
                  <SelectItem value="THIET-KE-DO-HOA">
                    Thiết kế đồ họa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 5: Image Upload */}
          <div className="grid gap-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="cursor-pointer file:font-medium file:text-primary"
              onChange={(e) => {
                const file = e.target.files?.[0];
                handleChange("image", file);
              }}
            />
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              Create Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
