import { Router } from "express";
import { LeadController } from "../controllers";

const router = Router();

/**
 * @swagger
 * /leads/createlead:
 *   post:
 *     tags:
 *       - Leads
 *     summary: Create a lead
 *     responses:
 *       201:
 *         description: Lead created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.post("/createlead", LeadController.createLead);

/**
 * @swagger
 * /leads/updateLead:
 *   put:
 *     tags:
 *       - Leads
 *     summary: Update a lead
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.put("/updateLead", LeadController.updateLead);

/**
 * @swagger
 * /leads/getall:
 *   get:
 *     tags:
 *       - Leads
 *     summary: Get all leads
 *     responses:
 *       200:
 *         description: List of leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get("/getall", LeadController.getAll);

/**
 * @swagger
 * /leads/getbyid/{id}:
 *   get:
 *     tags:
 *       - Leads
 *     summary: Get a lead by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Lead ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.get("/getbyid/:id", LeadController.get);

export default router;
