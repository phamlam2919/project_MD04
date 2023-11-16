import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as usersService from "../services/users.service";

export const isAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]?.trim();

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        try {
            const result: any = jwt.verify(token, process.env.TOKEN_SECRET as any) 
            const { id } = result.data;

            const user = await usersService.findOne(id);

            if (user) {
                next();
            } else {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
        } catch (error) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
};
