import { prisma } from "config/client"
import { TOTAL_ITEM_PER_PAGE } from "config/constant"

const handleGetAllOrders = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE
    const skip = (page - 1) * pageSize
    const orders = await prisma.order.findMany({
        skip: skip,
        take: pageSize,
        include: {
            user: true
        }
    })
    return orders ?? [] 
}


const handleCountTotalOrderPage = async () => {
    const pageSize = TOTAL_ITEM_PER_PAGE ;
    const totalOrder = await prisma.order.count()

    const totalPages = Math.ceil(totalOrder / pageSize)

    return totalPages
}

const handleGetDetailOrder = async (orderId: number) => {
    const orderDetails = prisma.orderDetail.findMany({
        where: {
            orderId
        },
        include: {
            product: true
        }
    })
    return orderDetails ?? []
}

const handleGetOrderHistory = async (userId: number) => {
    const orders = prisma.order.findMany({
        where: {
            userId
        },
        include: {
            orderDetails: {
                include: {
                    product: true 
                }
            }   
        }
    })

    return orders ?? []
}
 
export { handleCountTotalOrderPage, handleGetAllOrders, handleGetDetailOrder, handleGetOrderHistory }