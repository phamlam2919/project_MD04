import express, { Router } from "express";
const router: Router = express.Router();
import { signup, signin } from "../controllers/auth.controller";

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
