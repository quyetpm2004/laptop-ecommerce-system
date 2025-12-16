import { Request, Response } from "express";
import { handleGetAllUser, handleGetAllRole, handleCountTotalUserPage } from "services/user.service";
import { handleCountTotalProductPage, handleGetAllProducts } from "services/product.service";
import { handleCountTotalOrderPage, handleGetAllOrders } from "services/order.service";
import { handleGetInfo } from "services/dashboard.service";
const getDashboardPage = async (req: Request, res: Response) => {

    const info = await handleGetInfo()

    // get users
    return res.render('admin/dashboard/show.ejs', {info})
}

const getUserPage = async (req: Request, res: Response) => {
    const {page} = req.query
    let currentPage = page ? +page : 1
    if(currentPage <= 0) currentPage = 1

    const users = await handleGetAllUser(currentPage)
    // get users
    const totalPages = await handleCountTotalUserPage()
    return res.render('admin/user/show.ejs', {
        users: users,
        totalPages,
        currentPage
    })
}

const getCreateUserPage = async (req: Request, res: Response) => {
    // get users
    const roles = await handleGetAllRole()
    return res.render('admin/user/create.ejs', {
        roles
    })
}

const getProductPage = async (req: Request, res: Response) => {
    
    const { page } = req.query
    let currentPage = page ? +page : 1
    if(currentPage <= 0) currentPage = 1

    const products = await handleGetAllProducts(currentPage);

    const totalPages = await handleCountTotalProductPage()
    return res.render('admin/product/show.ejs', {
        products,
        totalPages,
        currentPage
    })
}

const getOrderPage = async (req: Request, res: Response) => {
    const {page} = req.query
    let currentPage = page ? +page : 1
    if(currentPage <= 0) currentPage = 1
    // get order
    const orders = await handleGetAllOrders(currentPage)
    const totalPages = await handleCountTotalOrderPage()

    return res.render('admin/order/show.ejs', {
        orders,
        totalPages,
        currentPage
    })
}







export { getDashboardPage, getUserPage, getProductPage, getOrderPage, getCreateUserPage };