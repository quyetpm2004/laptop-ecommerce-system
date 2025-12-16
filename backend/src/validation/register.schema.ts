import { handleCheckEmailExist } from "services/auth.service";
import * as z from "zod"; 

const emailSchema = z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ")
    .refine(async (e) => {
        const existEmail = await handleCheckEmailExist(e);
        if(existEmail) return false
        return true;
    }, { message: "Email đã tồn tại", path: ["email"] });

const passwordSchema = z.
    string()
    .trim()
    .min(3, "Mật khẩu tối thiểu 3 ký tự")
    .max(20, "Mật khẩu tối đa 20 ký tự");


export const RegisterSchema = z
    .object({ 
        fullName: z.string().trim().min(1, "Tên không được để trống").max(255, "Tên không được quá 255 ký tự"),
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    })


export type TRegisterSchema = z.infer<typeof RegisterSchema>;
