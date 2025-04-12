import { Router } from "express";
import { LeadController } from "../controllers";

const router = Router();

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

/**
 * @swagger
 * /leads:
 *   put:
 *     summary: Update a lead
 *     responses:
 *       200:
 *         description: update a lead.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */

router.put("/updateLead", LeadController.updateLead);

/**
 * @swagger
 * /leads:
 *   get:
 * *     summary: Get all leads
 *     responses:
 * *       200:
 * *         description: get all leads.
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               items:
 * *                 type: object
 * */

router.get("/", LeadController.getAll);

/**
 * @swagger
    * /leads:
    *  get:
    *   summary: Get a lead by ID
    *  parameters:
    *   - name: id
    *    in: path
    *   required: true
    *  description: The ID of the lead to retrieve
    * responses:
    *  200:
    *   
    * description: Get a lead by ID
    *  content:
    *  application/json:
    *   schema:
    *  type: object
    *   
    * items:
    *  type: object
    * */

router.get("/:id", LeadController.get);

export default router;