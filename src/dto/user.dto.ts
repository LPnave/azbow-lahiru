import { z } from "zod";
import { UserRole } from "../model/user";
import { token } from "morgan";

// Schema for creating a new user
export const userInitialSchema = z.object({
  userId: z.string().uuid().optional(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().min(7, "Phone number is too short"),
  name: z.string().min(1, "Name is required"),
  role: z.nativeEnum(UserRole).optional().default(UserRole.USER),
});

// Type for use in services/controllers
export type UserInitialDto = z.infer<typeof userInitialSchema>;

//schema for viewing data
export const userSchema = z.object({
    userId: z.string().uuid(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    phone: z.string().min(7, "Phone number is too short"),
    name: z.string().min(1, "Name is required"),
    role: z.nativeEnum(UserRole).optional().default(UserRole.USER),
  });
  
  // Type for use in services/controllers
export type UserDto = z.infer<typeof userSchema>;

  