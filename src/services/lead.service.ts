import { LeadDTO } from "../dto/lead.dto";
import { Lead } from "../model/lead";
import { LeadRepository } from "../repositories/lead.repository";

export class LeadService {
    constructor(public leadRepository: LeadRepository) {
        this.leadRepository = leadRepository;
    }

    async createLead(data: LeadDTO): Promise<Lead> {
        const lead = new Lead();
        lead.name = data.name;
        lead.email = data.email;
        lead.phone = data.phone;
        lead.status = data.status || "new"; // Default to "new" if not provided
        lead.source = data.source || "website"; // Default to "website" if not provided
        lead.inquiryDate = new Date(); // Set the current date as createdAt
        return await this.leadRepository.save(data);
    }

    async updateLead(data: LeadDTO): Promise<Lead | null> {
        const lead = await this.leadRepository.get(data.leadId as any); // UUIDs are strings
        if (!lead) return null;
        lead.name = data.name || lead.name;
        lead.email = data.email || lead.email;
        lead.phone = data.phone || lead.phone;
        lead.status = data.status || lead.status;
        lead.source = data.source || lead.source;
        lead.inquiryDate = data.inquiryDate || lead.inquiryDate;

        return await this.leadRepository.save(data);
        // return await LeadRepository.get(id as any); // Return updated lead
      }
}


export const createLeadService = (
    leadRepository: LeadRepository
): LeadService => new LeadService(leadRepository);