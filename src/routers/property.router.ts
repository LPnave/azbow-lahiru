import { Router } from "express";
import { PropertyController } from "../controllers";
import { authorize } from "../middleware/authorize";

const router = Router();

/**
 * @swagger
 * /property/createproperty:
 *   post:
 *     tags:
 *       - Property
 *     summary: Create a property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.post("/createproperty", authorize("create:property") ,PropertyController.createProperty);

/**
 * @swagger
 * /property/updateproperty:
 *   put:
 *     tags:
 *       - Property
 *     summary: Update a property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Property updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.put("/updateproperty", authorize("update:property") ,PropertyController.updateProperty);

/**
 * @swagger
 * /property/getall:
 *   get:
 *     tags:
 *       - Property
 *     summary: Get all properties
 *     responses:
 *       200:
 *         description: List of all properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */
router.get("/getall", authorize("view:property") ,PropertyController.getAll);

/**
 * @swagger
 * /property/getbyid/{id}:
 *   get:
 *     tags:
 *       - Property
 *     summary: Get a property by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: UUID of the property
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Property retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.get("/getbyid/:id", authorize("view:property") ,PropertyController.get);

export default router;
