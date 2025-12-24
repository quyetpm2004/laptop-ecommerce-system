import { log } from "console";
import { NextFunction, Request, Response } from "express";
import {
  handleCountTotalProductClientPage,
  handleGetAllProducts,
} from "services/item.service";
import {
  handleCreateUser,
  handleGetAllUser,
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
  handleGetAllRole,
} from "services/user.service";
import { handleCreateAccount } from "services/auth.service";
import {
  RegisterSchema,
  TRegisterSchema,
} from "src/validation/register.schema";
import { handleGetProductWithFilter } from "services/filter.service";

const getHomePage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  const totalPages = await handleCountTotalProductClientPage(8);
  const products = await handleGetAllProducts(currentPage, 8);

  return res.render("client/home/show.ejs", {
    products,
    totalPages,
    page: +currentPage,
  });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user.ejs");
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;

  const avatar = req.file ? req.file.filename : null;

  await handleCreateUser(fullName, username, address, phone, avatar, role);

  res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await handleDeleteUser(userId);

  res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
  const roles = await handleGetAllRole();
  const userId = req.params.id;
  const userSelect = await handleGetUser(userId);

  return res.render("admin/user/detail.ejs", {
    user: userSelect,
    roles: roles,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const { fullName, phone, role, address } = req.body;

  const avatar = req.file ? req.file.filename : null;

  await handleUpdateUser(fullName, phone, role, address, avatar, userId);

  return res.redirect("/admin/user");
};

const getLoginPage = (req: Request, res: Response) => {
  const { session } = req as any;
  const messages = session?.messages ?? [];
  return res.render("auth/login.ejs", { messages });
};

const getRegisterPage = (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return res.render("auth/register.ejs", {
    errors,
    oldData,
  });
};

const postRegisterPage = async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } =
    req.body as TRegisterSchema;
  const validationErrors = await RegisterSchema.safeParseAsync(req.body);
  if (!validationErrors.success) {
    const errorsVod = validationErrors.error.issues;
    const errors = errorsVod.map(
      (error) => `${error.message} - ${error.path.join(".")}`
    );
    console.log(errors);
    return res.render("auth/register.ejs", {
      errors: errors,
      oldData: {
        fullName,
        email,
        password,
        confirmPassword,
      },
    });
  }

  // await handleCreateAccount(fullName, email, password)

  res.redirect("/login");
};

const getSuccessLoginPage = (req: Request, res: Response) => {
  const user = req.user as any;
  if (user?.role?.name === "ADMIN") {
    res.redirect("/admin");
  } else res.redirect("/");
};

const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const getProductFilterPage = async (req: Request, res: Response) => {
  const {
    page,
    factory = "",
    target = "",
    price = "",
    sort = "",
  } = req.query as {
    page?: string;
    factory: string;
    target: string;
    price: string;
    sort: string;
  };
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  // const totalPages = await handleCountTotalProductClientPage(6)
  // const products = await handleGetAllProducts(currentPage, 6)

  const data = await handleGetProductWithFilter(
    currentPage,
    6,
    factory,
    target,
    price,
    sort
  );

  return res.render("client/product/filter.ejs", {
    products: data.products,
    totalPages: +data.totalPages,
    page: +currentPage,
  });
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
  getLoginPage,
  getRegisterPage,
  postRegisterPage,
  getSuccessLoginPage,
  postLogout,
  getProductFilterPage,
};
