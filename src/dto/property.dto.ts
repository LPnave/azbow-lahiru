import { z } from "zod";
import { PropertyType, PropertyStatus } from "../model/property";

export const propertySchema = z.object({
  propertyID: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  type: z.nativeEnum(PropertyType),
  status: z.nativeEnum(PropertyStatus).default(PropertyStatus.AVAILABLE),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type PropertyDTO = z.infer<typeof propertySchema>;
