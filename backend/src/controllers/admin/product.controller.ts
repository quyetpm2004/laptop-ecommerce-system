import { log } from "console";
import { Request, Response } from "express";
import { handleCreateProduct, handleGetAllProducts, handleGetProduct, handleUpdateProduct, handleDeleteProduct } from "services/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

const getCreateProductPage = (req: Request, res: Response) => {
    const errors = []
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: ""
    };
    return res.render("admin/product/create.ejs", {
        errors,
        oldData
    });
}

const postCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const image = req.file ? req.file.filename : null;
    const validationErrors = ProductSchema.safeParse(req.body);
    if (!validationErrors.success) {
        const errorsVod = validationErrors.error.issues;
        const errors = errorsVod.map(error => `${error.message} - ${error.path.join('.')}`);
        console.log(errors);
        return res.render("admin/product/create.ejs", {
            errors: errors,
            oldData: {
                name, price, detailDesc, shortDesc, quantity, factory, target
            }
        });
        
    }
    // If validation passes, proceed with creating the product
    // Call service to create product
    await handleCreateProduct(name, price, detailDesc, shortDesc, quantity, factory, target, image)
    // Redirect or respond with success message
    res.redirect("/admin/product");
}



// admin product controller
const getViewProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product =  await handleGetProduct(productId)

    const errors = [];
    return res.render('admin/product/detail.ejs', {
        errors,
        product,
        targetOptions,
        factoryOptions
    });
}

const postUpdateProduct = async (req: Request, res: Response) => { 
    const productId = req.params.id;
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const image = req.file ? req.file.filename : null;
    const validationErrors = ProductSchema.safeParse(req.body);
    if (!validationErrors.success) {
        const errorsVod = validationErrors.error.issues;
        const errors = errorsVod.map(error => `${error.message} - ${error.path.join('.')}`);
        
        return res.render("admin/product/detail.ejs", {
            errors: errors,
            product: {
                id: productId,
                name, price, detailDesc, shortDesc, quantity, factory, target
            },
            targetOptions,
            factoryOptions
        });
    }
    await handleUpdateProduct(name, price, detailDesc, shortDesc, quantity, factory, target, image, productId)
    
    res.redirect("/admin/product");
}

const postDeleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    
    await handleDeleteProduct(productId);

    res.redirect("/admin/product");
}


export { getCreateProductPage, postCreateProduct, getViewProduct, postUpdateProduct, postDeleteProduct };