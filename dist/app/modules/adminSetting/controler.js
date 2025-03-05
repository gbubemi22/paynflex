import StatusCode from "http-status-codes";
import { create, listAllSettings, listOneAdminSetting, remove, update, } from "./service.js";
export const Create = async (req, res, next) => {
    try {
        const { type, rewardPercentage } = req.body;
        res.status(StatusCode.CREATED).json(await create(type, rewardPercentage));
    }
    catch (error) {
        next(error);
    }
};
export const ListOne = async (req, res, next) => {
    try {
        res.status(StatusCode.OK).json(await listOneAdminSetting(req.params.id));
    }
    catch (error) {
        next(error);
    }
};
export const ListAllSettings = async (req, res, next) => {
    try {
        res.status(StatusCode.OK).json(await listAllSettings());
    }
    catch (error) {
        next(error);
    }
};
export const UpdateSettings = async (req, res, next) => {
    try {
        const { type, rewardPercentage } = req.body;
        res
            .status(StatusCode.OK)
            .json(await update(req.params.id, rewardPercentage, type));
    }
    catch (error) {
        next(error);
    }
};
export const Remove = async (req, res, next) => {
    try {
        res.status(StatusCode.OK).json(await remove(req.params.id));
    }
    catch (error) {
        next(error);
    }
};
