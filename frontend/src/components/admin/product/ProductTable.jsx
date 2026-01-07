import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Factory</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-muted/50">
              <TableCell>{product.id}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("vi-VN").format(product.price)}đ
              </TableCell>
              <TableCell>{product.factory}</TableCell>
              <TableCell className=" space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Eye className="w-4 h-4 text-blue-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(product)}
                >
                  <Edit className="w-4 h-4 text-amber-500" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm delete?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure want to delete product: {product.name}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(product.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Sheet chi tiết sản phẩm hiển thị thông tin dạng Text */}
      <Sheet
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <SheetContent className="sm:max-w-[700px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Detail product</SheetTitle>
            <SheetDescription>Detail information of product.</SheetDescription>
          </SheetHeader>

          {selectedProduct && (
            <div className="space-y-4 text-sm py-6 px-4">
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">Name</p>
                  <p className="text-base font-semibold border-b pb-1">
                    {selectedProduct.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">Price</p>
                  <p className="text-base font-semibold border-b pb-1">
                    {new Intl.NumberFormat("vi-VN").format(
                      selectedProduct.price
                    )}{" "}
                    đ
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground font-medium">Description</p>
                <p className="text-sm leading-relaxed bg-muted/30 rounded-md italic">
                  {selectedProduct.detailDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">
                    Short Description
                  </p>
                  <p className="border-b pb-1">
                    {selectedProduct.shortDesc || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">Quantity</p>
                  <p className="border-b pb-1">
                    {selectedProduct.quantity || 0}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">Factory</p>
                  <p className="border-b pb-1">{selectedProduct.factory}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">Target</p>
                  <p className="border-b pb-1">
                    {selectedProduct.target || "General"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-muted-foreground font-medium">Image</p>
                <div className="mt-2 rounded-xl overflow-hidden border shadow-sm max-w-[400px]">
                  <img
                    className="w-full h-auto object-cover"
                    src={`${
                      import.meta.env.VITE_BASE_URL_BACKEND
                    }/images/product/${selectedProduct.image}`}
                    alt={selectedProduct.name}
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductTable;
