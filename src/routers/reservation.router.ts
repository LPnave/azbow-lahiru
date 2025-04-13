import { Router } from "express";
import { ReservationController } from "../controllers";
import { authorize } from "../middleware/authorize";

const router = Router();

/**
 * @swagger
 * /reservation/createreservation:
 *   post:
 *     tags:
 *       - Reservation
 *     summary: Create a new reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leadID:
 *                 type: string
 *               propertyID:
 *                 type: string
 *               reservationDate:
 *                 type: string
 *                 format: date-time
 *               reservationFee:
 *                 type: number
 *               expectedClosing:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [Pending, FinancialApproved, LegalDone, Cancelled]
 *               cancellationReason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservation created successfully
 */
router.post("/createreservation", authorize("create:reservations") ,ReservationController.createReservation);

/**
 * @swagger
 * /reservation/updatereservation:
 *   put:
 *     tags:
 *       - Reservation
 *     summary: Update an existing reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservationID:
 *                 type: string
 *               reservationFee:
 *                 type: number
 *               expectedClosing:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [Pending, FinancialApproved, LegalDone, Cancelled]
 *               cancellationReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 */
router.put("/updatereservation", authorize("update:reservations") ,ReservationController.updateReservation);

/**
 * @swagger
 * /reservation/getall:
 *   get:
 *     tags:
 *       - Reservation
 *     summary: Get all reservations
 *     responses:
 *       200:
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/getall", authorize("view:reservations") ,ReservationController.getAll);

/**
 * @swagger
 * /reservation/getbyid/{id}:
 *   get:
 *     tags:
 *       - Reservation
 *     summary: Get a reservation by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The reservation ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/getbyid/:id", authorize("view:reservations") ,ReservationController.get);

export default router;
