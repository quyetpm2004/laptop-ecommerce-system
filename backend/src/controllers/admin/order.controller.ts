import { Request, Response } from "express";
import { handleGetDetailOrder } from "services/order.service";


const getDetailOrder = async (req: Request, res: Response) => {

    // get order
    const orderId = req.params.id

    const orderDetails = await handleGetDetailOrder(+orderId)

    return res.render('admin/order/detail.ejs', {
        orderId,
        orderDetails
    })
}




export { getDetailOrder }