import { prisma } from "config/client";
import { ACCOUNT_TYPE, TOTAL_ITEM_PER_PAGE } from "config/constant";

import bcrypt from "bcrypt";
import { ITEM_PER_PAGE } from "src/utils/constant";
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
  try {
    const hashedPassword = await bcrypt.hash(plainText, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

const comparePassword = async (myPlaintextPassword: string, hash: string) => {
  return bcrypt.compare(myPlaintextPassword, hash);
};

const handleGetAllUser = async (page: number, name: string) => {
  const pageSize = ITEM_PER_PAGE;
  const skip = (page - 1) * pageSize;
  try {
    const users = await prisma.user.findMany({
      skip: skip,
      take: pageSize,
      where: {
        username: {
          contains: name,
        },
      },
      omit: {
        password: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};

const handleCountTotalUserPage = async () => {
  const pageSize = ITEM_PER_PAGE;
  const totalUser = await prisma.user.count();

  const totalPages = Math.ceil(totalUser / pageSize);

  return totalPages;
};

const handleGetAllRole = async () => {
  try {
    const roles = await prisma.role.findMany();

    return roles;
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};

const handleCreateUser = async (
  name: string,
  username: string,
  address: string,
  phone: string,
  avatar: string,
  role: string,
  password: string
) => {
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: {
      fullName: name,
      username: username,
      address: address,
      phone: phone,
      avatar: avatar,
      password: hashedPassword,
      accountType: ACCOUNT_TYPE.SYSTEM,
      roleId: +role,
    },
  });
};

const handleDeleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const handleGetUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

const handleUpdateUser = async (
  fullName: string,
  phone: string,
  roleId: string,
  address: string,
  avatar: string,
  userId: string
) => {
  try {
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        fullName: fullName,
        phone: phone,
        roleId: +roleId,
        address: address,
        ...(avatar && { avatar: avatar }), // Only update avatar if it exists
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export {
  handleCreateUser,
  handleGetAllUser,
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
  handleGetAllRole,
  hashPassword,
  comparePassword,
  handleCountTotalUserPage,
};
