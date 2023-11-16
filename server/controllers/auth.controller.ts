import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        await authService.signup(name, email, password);
        res.json({
            status: 200,
            message: "Sign up successfully",
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await authService.signin(email, password);

        res.json({ result, message: "Sign in success" });
    } catch (error) {
        res.json({
            error,
        });
    }
};
