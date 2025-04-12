import { Router } from "express";
import { LeadAssignmentController } from "../controllers";

const router = Router();

/**
 * @swagger 
 * /leads:
 *   post:
 *  summary: Create a lead assignment
 *     responses:
 *       200:
 *         description: assign a lead.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
*/
router.post("/assignLead", LeadAssignmentController.createLeadAssignment);

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
router.put("/updateLeadAssignment", LeadAssignmentController.updateLeadAssignment);

/**
 * @swagger
 * /leads:
 *   get:
 *     summary: Get all leads
 *     responses:
 *       200:
 *         description: get all leads.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */
router.get("/", LeadAssignmentController.getAll);

/**
 * @swagger
 * /leads:
 *   get:
 *     summary: Get a lead by ID
 *     responses:
 *       200:
 *         description: get a lead by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */
router.get("/:id", LeadAssignmentController.get);

export default router;