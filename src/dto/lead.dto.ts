import { z } from "zod";
import { LeadSource, LeadStatus } from "../model/lead";

export const leadSchema = z.object({
    leadId: z.string().uuid().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().optional(),
    source: z.nativeEnum(LeadSource),
    inquiryDate: z.coerce.date(),
    status: z.nativeEnum(LeadStatus).default(LeadStatus.UNASSIGNED),
});

export type LeadDTO = z.infer<typeof leadSchema>;

// export const editLeadSchema = z.object({
//     id:. z.,,
//     name: z.string().optional(),
//     email: z.string().email().optional(),
//     phone: z.string().optional(),
//     source: z.nativeEnum(LeadSource).optional(),
//     inquiryDate: z.coerce.date().optional(),
//     status: z.nativeEnum(LeadStatus).optional(),
//   });
  
//   export type EditLeadDTO = z.infer<typeof editLeadSchema>;