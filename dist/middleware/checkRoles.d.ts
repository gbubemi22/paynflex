import { Request, Response, NextFunction } from "express";
import { Controller } from "../utils/constant.js";
export declare const fetchRoleDetails: Controller;
export declare const checkRole: (requiredRole: string) => (req: Request, res: Response, next: NextFunction) => void;
interface User {
    role: string;
}
export declare const authorizePermissions: (...roles: string[]) => (req: Request & {
    user?: User;
}, res: Response, next: NextFunction) => void;
export {};
