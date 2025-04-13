import { Router } from "express";
import { LeadAssignmentController } from "../controllers";
import { authorize } from "../middleware/authorize";

const router = Router();

/**
 * @swagger
 * /leadassignment/assignLead:
 *   post:
 *     tags:
 *       - LeadAssignment
 *     summary: Create a lead assignment
 *     responses:
 *       201:
 *         description: Lead assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 leadId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.post("/assignLead",authorize("create:leadassignments") ,LeadAssignmentController.createLeadAssignment);

/**
 * @swagger
 * /leadassignment/updateLeadAssignment:
 *   put:
 *     tags:
 *       - LeadAssignment
 *     summary: Update a lead assignment
 *     responses:
 *       200:
 *         description: Lead assignment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 leadId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.put("/updateLeadAssignment", authorize("update:leadassignments") ,LeadAssignmentController.updateLeadAssignment);

/**
 * @swagger
 * /leadassignment/getall:
 *   get:
 *     tags:
 *       - LeadAssignment
 *     summary: Get all lead assignments
 *     responses:
 *       200:
 *         description: List of lead assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   leadId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get("/getall", authorize("view:leadassignments") ,LeadAssignmentController.getAll);

/**
 * @swagger
 * /leadassignment/getbyid/{id}:
 *   get:
 *     tags:
 *       - LeadAssignment
 *     summary: Get a lead assignment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Lead assignment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead assignment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 leadId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.get("/getbyid/:id", authorize("view:assignments") ,LeadAssignmentController.get);

export default router;
