import { prisma } from "config/client";
import { comparePassword } from "./user.service";
import jwt from "jsonwebtoken";
import "dotenv/config";

const handleGetUsersAPI = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const handleGetUserByIdAPI = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const handleUpdateUserById = async (
  id: number,
  fullName: string,
  phone: string,
  address: string
) => {
  await prisma.user.update({
    where: { id: id },
    data: {
      fullName,
      phone,
      address,
    },
  });
};

const handleDeleteUser = async (userId: number) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

const handleUserLogin = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { role: true },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role.name, // hoặc roleId
    accountType: user.accountType,
    avatar: user.avatar,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "356d",
  });

  return {
    token: accessToken,
    user: payload,
  };
};

export {
  handleGetUsersAPI,
  handleGetUserByIdAPI,
  handleUpdateUserById,
  handleDeleteUser,
  handleUserLogin,
};
