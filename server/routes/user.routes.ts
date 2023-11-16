import express, { Request, Response } from "express";
import {
    findAll,
    findOne,
    create,
    update,
    remove,
} from "../controllers/users.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = express.Router();

// Khởi tạo route (endpoint) theo đúng các vụ C/R/U/D
router.get("/", findAll);

router.get("/:id", findOne);

router.post("/", isAuth, create);

router.put("/:id", isAuth, update);

router.delete("/:id", remove);

export default router;
