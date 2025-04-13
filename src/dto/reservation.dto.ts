import { z } from "zod";
import { ReservationStatus } from "../model/reservation"; // adjust the path if needed

export const reservationSchema = z.object({
  reservationID: z.string().uuid().optional(),
  leadID: z.string().uuid({ message: "Lead ID must be a valid UUID" }),
  propertyID: z.string().uuid({ message: "Property ID must be a valid UUID" }),
  reservationDate: z.coerce.date(),
  reservationFee: z.coerce.number().optional(),
  expectedClosing: z.coerce.date().optional(),
  status: z.nativeEnum(ReservationStatus).default(ReservationStatus.PENDING),
  cancellationReason: z.string().optional(),
});

export type ReservationDTO = z.infer<typeof reservationSchema>;
