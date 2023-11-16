import express, { Request, Response } from "express";
import db from "../utils/db";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const result: any = await db.execute("SELECT * FROM category");
        const [rows] = result;
        // console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        res.json(error);
    }
});

export default router;
