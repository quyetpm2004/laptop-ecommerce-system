import { Request, Response } from "express";
import { handleGetInfo } from "services/dashboard.service";

const getDashboard = async (req: Request, res: Response) => {
  try {
    const dashboard = await handleGetInfo();
    res.status(200).json({
      data: dashboard,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { getDashboard };
