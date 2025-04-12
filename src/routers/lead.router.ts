import { Router } from "express";
import { LeadController } from "../controllers";

const router = Router();

// router.get("/", UserController.getAll);

// router.get("/:id", UserController.get);

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Create a lead
 *     responses:
 *       200:
 *         description: create a lead.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */

router.post("/createlead", LeadController.createLead);

// router.put("/:id", UserController.edit);

export default router;