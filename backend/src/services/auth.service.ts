import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "./user.service";

const handleCheckEmailExist = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: email,
      },
    });
    return user ? true : false;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
};

const handleCreateAccount = async (
  fullName: string,
  email: string,
  password: string,
  address: string,
  phone: string
) => {
  if (password.length < 6) {
    throw new Error("Password cần có ít nhất 6 kí tự");
  }
  const hashedPassword = await hashPassword(password);

  const role = await prisma.role.findFirst({
    where: {
      name: "USER",
    },
  });

  const user = await prisma.user.findUnique({
    where: { username: email },
  });

  if (user) {
    throw new Error("Email đã tồn tại");
  }

  try {
    await prisma.user.create({
      data: {
        fullName,
        username: email,
        password: hashedPassword,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: role.id,
        address,
        phone,
      },
    });
  } catch (error) {
    console.error("Error creating account:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const handleLogin = async (
  username: string,
  password: string,
  callback: any
) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    return callback(null, false, { message: `Username ${username} not found` });
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return callback(null, false, { message: `Password invalid` });
  }
  return callback(null, user);
};

const handleGetRoleUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        role: true,
      },
      omit: {
        password: true,
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

const handleGetUserSumCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: Number(userId),
    },
  });
  return cart?.sum ?? 0;
};

export {
  handleCheckEmailExist,
  handleCreateAccount,
  handleLogin,
  handleGetRoleUser,
  handleGetUserSumCart,
};
