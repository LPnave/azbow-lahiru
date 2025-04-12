import { z } from "zod";

// DTO Schema using Zod
export const leadAssignmentSchema = z.object({
  assignmentId: z.string().uuid().optional(),
  leadID: z.string().uuid(),
  agentID: z.string().uuid(),
  followUpStatus: z.string().min(1, "Follow-up status is required"),
  preferredType: z.string().min(1, "Preferred type is required"),
  budget: z.number().positive("Budget must be a positive number"),
  notes: z.string().optional(),
});

// Type inference for use in services/controllers
export type LeadAssignmentDto = z.infer<typeof leadAssignmentSchema>;
