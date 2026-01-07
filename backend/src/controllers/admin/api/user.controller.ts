import { Request, Response } from "express";
import {
  handleCountTotalUserPage,
  handleCreateUser,
  handleDeleteUser,
  handleGetAllUser,
  handleUpdateUser,
} from "services/user.service";

const getAllUser = async (req: Request, res: Response) => {
  const { page, name } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  try {
    const users = await handleGetAllUser(currentPage, name as string);
    const totalPages = await handleCountTotalUserPage();
    res.status(200).json({
      data: {
        users,
        totalPages,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  const { username, fullName, address, phone, role, password } = req.body;
  const avatar = req?.file?.filename ?? null;
  try {
    const user = await handleCreateUser(
      fullName,
      username,
      address,
      phone,
      avatar,
      role,
      password
    );
    res.status(201).json({
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, address, phone, roleId } = req.body;
  const avatar = req?.file?.filename ?? null;
  try {
    const user = await handleUpdateUser(
      fullName,
      phone,
      roleId,
      address,
      avatar,
      id
    );
    res.status(200).json({
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  await handleDeleteUser(userId);

  res.status(200).json({
    data: "delete user succeed",
    success: true,
  });
};
export { getAllUser, createNewUser, updateUser, deleteUser };
