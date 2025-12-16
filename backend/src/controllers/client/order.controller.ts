
import { Request, Response } from "express";
import { handleGetOrderHistory } from "services/order.service";


const getOrderHistoryPage = async (req: Request, res: Response) => {

    const user = req.user

    const orders = await handleGetOrderHistory(+user.id)

    console.log("<<< order", orders[0].orderDetails)

    return res.render('client/order/order-history.ejs', {
        orders
    })
}

export { getOrderHistoryPage }