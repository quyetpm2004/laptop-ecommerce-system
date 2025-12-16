import * as z from "zod"; 

export const ProductSchema = z.object({ 
    name: z.string().trim().min(1, "Tên không được để trống").max(255, "Tên không được quá 255 ký tự"),
     price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
        message: "Số tiền tối thiểu là 1",
    }),
    detailDesc: z.string().trim().min(1, "Mô tả chi tiết không được để trống").max(255, "Mô tả chi tiết không được quá 255 ký tự"),
    shortDesc: z.string().trim().min(1, "Mô tả ngắn không được để trống").max(255, "Mô tả ngắn không được quá 255 ký tự"),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
        message: "Số lượng tối thiểu là 1",
    }),
    factory: z.string().trim().min(1, "Nhà sản xuất không được để trống").max(255, "Nhà sản xuất không được quá 255 ký tự"),
    target: z.string().trim().min(1, "Đối tượng không được để trống").max(255, "Đối tượng không được quá 255 ký tự"),
});

export type TProductSchema = z.infer<typeof ProductSchema>;