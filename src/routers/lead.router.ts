import { Router } from "express";
import { LeadController } from "../controllers";

const router = Router();

// router.get("/", UserController.getAll);

// router.get("/:id", UserController.get);

router.post("/createlead", LeadController.createLead);

// router.put("/:id", UserController.edit);

export default router;