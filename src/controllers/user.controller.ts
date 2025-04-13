import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { UserRole } from "../model";
import { userRepository } from "../repositories";
import { createUserService } from "../services";
import { HttpException } from "../utils/types";
import { userInitialSchema, userSchema } from "../dto/user.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

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

export const login = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const { email, password } = req.body;
  
      const user = await userService.getByEmail(email);
      if (!user) {
        next(new HttpException(400, "Internal server error"));

        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check if credentials are valid (service layer logic)
      const usercreds = await userService.checkCredentials(email, password);
  
      if (!usercreds) {
        next(new HttpException(401, "Invalid credentials"));

        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const payload = {
        id: user.userId,
        email: user.email,
        name: user.name,
        role: user.role,
      };
  
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
  
      return res.status(200).json({
        message: "Authentication successful",
        accessToken,
        refreshToken,
        user: {
          id: user.userId,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
        next(new HttpException(500, "Internal server error"));
      return res.status(500).json({ message: "Internal server error" });
    }
  };