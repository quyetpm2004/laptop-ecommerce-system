import { prisma } from "config/client"
import { comparePassword } from "./user.service"
import jwt from "jsonwebtoken"
import "dotenv/config"

const handleGetUsersAPI = async () => {
    const users = await prisma.user.findMany()

    return users
}

const handleGetUserByIdAPI = async (id: number) => {
    return await prisma.user.findUnique({
        where: {id}
    })
}

const handleUpdateUserById = async (id: number, fullName: string, phone: string, address: string) => {
    await prisma.user.update({
        where: {id: id},
        data: {
            fullName,
            phone,
            address
        }
    })
}

const handleDeleteUser = async (userId: number) => {
    await prisma.user.delete({
        where: {
            id: userId
        }
    })
}

const handleUserLogin = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {username},
        include: {
            role: true
        }
    })
    if(!user) {
        throw new Error('Username not found')
    }
    const isMatch = await comparePassword(password, user.password)
    if(!isMatch) {
        throw new Error('Invalid password')
    }

    const payload = {
        id: user.id, 
        username: user.username,
        roleId: user.roleId,
        accountType: user.accountType,
        avatar: user.avatar,
        role: user.role
    }

    const secret = process.env.JWT_SECRET
    // có user login => định nghĩa access token
    const access_token = jwt.sign(payload, secret, {
        expiresIn: "1d"
    })

    return access_token
}


export { handleGetUsersAPI, handleGetUserByIdAPI, handleUpdateUserById, handleDeleteUser, handleUserLogin }