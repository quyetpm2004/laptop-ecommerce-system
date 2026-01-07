import { useEffect, useState } from "react";
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

const UpdateProductModal = ({ isOpen, onClose, onUpdate, productData }) => {
  const [formData, setFormData] = useState(productData);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onUpdate(formData);
    onClose();
  };

  // Dọn dẹp bộ nhớ cho URL preview ảnh
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Row 1: Name & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData?.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData?.price || ""}
                onChange={(e) => handleChange("price", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              className="min-h-[100px]"
              value={formData?.detailDesc || ""}
              onChange={(e) => handleChange("detailDesc", e.target.value)}
            />
          </div>

          {/* Row 3: Short Description & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-shortDesc">Short Description</Label>
              <Input
                id="edit-shortDesc"
                value={formData?.shortDesc || ""}
                onChange={(e) => handleChange("shortDesc", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-quantity">Quantity</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={formData?.quantity || ""}
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: Factory & Target */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Factory</Label>
              <Select
                value={formData?.factory || ""}
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
                value={formData?.target || ""}
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

          {/* Row 5: Image (File) & Preview */}
          <div className="grid gap-2">
            <Label htmlFor="edit-image">Product Image</Label>
            <Input
              id="edit-image"
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                handleChange("image", file);
                setPreviewImage(URL.createObjectURL(file));
              }}
            />
            {(previewImage || formData?.image) && (
              <div className="mt-2 border rounded-lg p-2 w-fit bg-muted/20">
                <img
                  className="max-w-[200px] h-auto rounded"
                  src={
                    previewImage
                      ? previewImage
                      : `${
                          import.meta.env.VITE_BASE_URL_BACKEND
                        }/images/product/${formData.image}`
                  }
                  alt="Product preview"
                />
                <p className="text-[10px] text-center mt-1 text-muted-foreground">
                  Current / New Preview
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
