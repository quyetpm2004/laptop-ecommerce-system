import { prisma } from "config/client"
import exp from "constants"

const handleGetInfo = async () => {
    const userCount = await prisma.user.count()
    const productCount = await prisma.product.count()
    const orderCount = await prisma.order.count()

    return {
        userCount,
        productCount,
        orderCount
    }
}

export { handleGetInfo }