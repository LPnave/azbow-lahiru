import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();

router.get("/getall", UserController.getAll);

router.get("/getbyid/:id", UserController.get);

router.post("/adduser", UserController.add);

router.put("/edituser", UserController.edit);

export default router;
