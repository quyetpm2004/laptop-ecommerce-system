import { prisma } from "config/client";
import { Request, Response } from "express";
import { handleDeleteUser, handleGetUserByIdAPI, handleGetUsersAPI, handleUpdateUserById, handleUserLogin } from "services/api.service";
import { handleCreateAccount } from "services/auth.service";
import { handleAddProductToCart } from "services/item.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";


const postAddProductToCartAPI =  async (req: Request, res: Response) => {
    const {quantity, productId} = req.body
    const user = req.user

    const currentSum = req?.user?.sumCart ?? 0
    const newSum = currentSum + (+quantity)

    await handleAddProductToCart(+quantity, +productId, user)

    res.status(200).json({
        data: newSum
    })
}

const getUsersAPI = async (req: Request, res: Response) => {
    const users = await handleGetUsersAPI()
    console.log("username: ", req.user.username)
    
    res.status(200).json({
        data: users
    })
}

const getUserByIdAPI = async (req: Request, res: Response) => {
    const userId = req.params.id
    const user = await handleGetUserByIdAPI(+userId)
    res.status(200).json({
        data: user
    })
}

const createUser = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema;
    const validationErrors = await RegisterSchema.safeParseAsync(req.body);
    if(!validationErrors.success) {
        const errorsVod = validationErrors.error.issues;
        const errors = errorsVod.map(error => `${error.message} - ${error.path.join('.')}`);
        console.log(errors);
        
        res.status(400).json({
            errors: errors
        })
        return;
    }

    await handleCreateAccount(fullName, email, password)

    res.status(201).json({
        data: "create user succeed"
    })
}

const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id

    const {  fullName, phone, address } = req.body
    
    await handleUpdateUserById(+userId, fullName, phone, address)

    res.status(200).json({
        data: "update user succeed"
    })
}

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    
    await handleDeleteUser(+userId)

    res.status(200).json({
        data: "delete user succeed"
    })
}

const loginAPI = async (req: Request, res: Response) => {
    const {username, password} = req.body

    try {
        const access_token = await handleUserLogin(username, password)
        res.status(200).json({
            data: {
                access_token
            }
        })
    } catch(error) {
        res.status(401).json({
            data: null,
            message: error.message
        })
    }
}

const fetchAccountAPI = async (req: Request, res: Response) => {
    const user = req.user
    res.status(200).json({
        data: {
            user
        }
    })
}

export { postAddProductToCartAPI, getUsersAPI, getUserByIdAPI, createUser, updateUser, deleteUser, loginAPI, fetchAccountAPI }