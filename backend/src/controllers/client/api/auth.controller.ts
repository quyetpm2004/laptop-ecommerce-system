import { Request, Response } from "express";
import { handleUserLogin } from "services/api.service";
import { handleCreateAccount } from "services/auth.service";

const loginAPI = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const data = await handleUserLogin(email, password);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(401).json({
      data: null,
      message: error.message,
    });
  }
};

const registerAPI = async (req: Request, res: Response) => {
  const { fullName, email, password, address, phone } = req.body;

  try {
    await handleCreateAccount(fullName, email, password, address, phone);
    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

export { loginAPI, registerAPI };
