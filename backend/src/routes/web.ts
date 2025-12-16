import express, { Express } from "express"
import { postCreateUser, getHomePage, postDeleteUser, getViewUser, postUpdateUser, getLoginPage, getRegisterPage, postRegisterPage, getSuccessLoginPage, postLogout, getProductFilterPage } from "controllers/user.controller"
import { getDashboardPage, getUserPage, getProductPage, getOrderPage, getCreateUserPage } from "controllers/admin/dashboard.controller"
import { getCreateProductPage, postCreateProduct, getViewProduct, postUpdateProduct, postDeleteProduct } from "controllers/admin/product.controller"
import { getCartPage, getCheckoutPage, getDetailProduct, getProductPageClient, getThanksPage, postDeleteCardDetail, postPlaceOrder, postProductToCart, postToCheckout } from "controllers/client/product.controller"
import fileUploadMiddleware from "src/middleware/fileUploadMiddleware"
import passport from "passport"
import { isAdmin } from "src/middleware/auth" 
import { getDetailOrder } from "controllers/admin/order.controller"
import { getOrderHistoryPage } from "controllers/client/order.controller"
const router = express.Router()

const webRouters = (app: Express) => {
    // auth route
    router.get('/success-login', getSuccessLoginPage)

    router.get('/login', getLoginPage)
    router.post('/login', passport.authenticate('local', {
        successReturnToOrRedirect: '/success-login',
        failureRedirect: '/login',
        failureMessage: true
    }));

    router.get('/register', getRegisterPage)
    router.post('/register', postRegisterPage)
    router.post('/logout', postLogout)

    // client route
    router.get('/', getHomePage)  
    router.get('/products', getProductFilterPage)
    router.get('/product/:id', getDetailProduct) 
    router.post('/add-product-to-cart/:id', postProductToCart)
    router.get('/cart', getCartPage)
    router.post('/delete-product-in-cart/:id', postDeleteCardDetail)
    router.get('/checkout', getCheckoutPage)
    router.post('/handle-cart-to-checkout', postToCheckout)
    router.post('/place-order', postPlaceOrder)
    router.get('/thanks', getThanksPage)
    router.get('/order-history', getOrderHistoryPage)

    // admin user
    router.get('/admin', getDashboardPage)  
    router.get('/admin/user', getUserPage)  
    router.get('/admin/create-user', getCreateUserPage)  
    router.post('/admin/handle-create-user', fileUploadMiddleware("avatar"), postCreateUser)
    router.get('/admin/view-user/:id', getViewUser)
    router.post('/admin/delete-user/:id', postDeleteUser)
    router.post('/admin/update-user/:id', fileUploadMiddleware("avatar"), postUpdateUser)
    

    // admin product
    router.get('/admin/product', getProductPage)  
    router.get('/admin/create-product', getCreateProductPage)  
    router.post('/admin/create-product', fileUploadMiddleware("image", "images/product"), postCreateProduct)  
    router.get('/admin/view-product/:id', getViewProduct)
    router.post('/admin/update-product/:id', fileUploadMiddleware("image", "images/product"), postUpdateProduct)
    router.post('/admin/delete-product/:id', postDeleteProduct)


    router.get('/admin/order', getOrderPage)  
    router.get('/admin/view-order/:id', getDetailOrder)


    

    app.use("/", isAdmin, router)
}

export default webRouters


