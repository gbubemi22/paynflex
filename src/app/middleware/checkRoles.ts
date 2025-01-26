import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError } from "../utils/error.js";
import { Controller } from "../utils/constant.js";
import Role from "../modules/role/model.js";

export const fetchRoleDetails: Controller = async (req, res, next) => {
  try {
    const roleId = req.user?.role;

    if (!roleId) {
      throw new UnauthorizedError("Role ID is missing in the token");
    }

    // Fetch the role details from the database
    const role = await Role.findById(roleId);

    if (!role) {
      throw new UnauthorizedError("Role not found");
    }

    // Attach the role details to the request object
    req.user.role = role;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch role details",
      httpStatusCode: 500,
      error: "SERVER_ERROR",
      service: process.env.SERVICE_NAME as string,
    });
  }
};

export const checkRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user || !user.roleId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Access denied. No role assigned.",
        httpStatusCode: 401,
        error: "UNAUTHORIZED",
      });
      return; // Ensure the function exits
    }

    if (user.role !== requiredRole) {
      res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: `Access denied. Requires ${requiredRole} role.`,
        httpStatusCode: 403,
        error: "FORBIDDEN",
      });
      return; // Ensure the function exits
    }

    next(); // Proceed if the role matches
  };
};

interface User {
  role: string;
}

export const authorizePermissions = (...roles: string[]) => {
  return (
    req: Request & { user?: User },
    res: Response,
    next: NextFunction
  ) => {
    // Check if the user role is included in the allowed roles
    if (!req.user || !roles.includes(req.user.role)) {
      console.log(req.user.role)
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};


