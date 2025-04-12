import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { UserRole } from "../model";
import { userRepository } from "../repositories";
import { createUserService } from "../services";
import { HttpException } from "../utils/types";
import { userInitialSchema, userSchema } from "../dto/user.dto";

const userService = createUserService(userRepository);

export const getAll = async (_req: Request, res: Response) => {
    const users = await userService.getAll();
    res.json(users);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await userService.getById(id);
    if (user === null) {
        next(new HttpException(404, "User not found"));
    } else {
        res.json(user);
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userFromBody = userInitialSchema.parse(req.body);
        try {
            const user = await userService.add(userFromBody);
            res.status(201).json(user);
        } catch (error:any) {
            next(
                new HttpException(
                    409,
                    `Could not create user - ${error.message}`
                )
            );
        }
    } catch (error) {
        next(
            new HttpException(
                400,
                `User object is required in the request body`
            )
        );
    }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userFromBody = userSchema.parse(req.body);
        try {
            await userService.edit(userFromBody);
            res.status(200).send();
        } catch (error:any) {
            next(
                new HttpException(
                    409,
                    `Could not edit user ${userFromBody.userId} - ${error.message}`
                )
            );
        }
    } catch (error) {
        next(
            new HttpException(
                400,
                `User object is required in the request body`
            )
        );
    }
};
