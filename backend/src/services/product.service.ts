import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from 'config/client'
import { TOTAL_ITEM_PER_PAGE } from 'config/constant'

const handleGetAllProducts = async (page: number) => {

    const pageSize = TOTAL_ITEM_PER_PAGE
    const skip = (page - 1) * pageSize

    try {
        const products = await prisma.product.findMany({
            skip,
            take: pageSize
        })
        return products
    } catch (error) {
        console.error("Error fetching products:", error)
        return []
    }
}

const handleCountTotalProductPage = async () => {
    const pageSize = TOTAL_ITEM_PER_PAGE
    const totalProduct = await prisma.product.count()

    return Math.ceil(totalProduct / pageSize)
}


const handleCreateProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string
) => {
    await prisma.product.create({
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            factory: factory,
            target: target,
            image: image
        }
    })
}

const handleGetProduct = async (productId: string) => { 
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: +productId
            }
        })
        return product
    } catch (error) {
        console.error("Error fetching product:", error)
        return null
    }
}

const handleUpdateProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string,
    productId: string
) => {
    await prisma.product.update({
        where: {
            id: Number(productId)
        },
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            factory: factory,
            target: target,
            ... image && { image: image } 
        }
    })
}

const handleDeleteProduct = async (productId: string) => {
    await prisma.product.delete({
        where: {
            id: Number(productId)
        }
    })
}

export { handleCreateProduct, handleGetAllProducts, handleGetProduct, handleUpdateProduct, handleDeleteProduct, handleCountTotalProductPage }