import { DeepPartial } from "typeorm";
import { LeadDTO } from "../dto/lead.dto";
import { Lead, LeadStatus } from "../model/lead";
import { LeadRepository } from "../repositories/lead.repository";
import { leadStatusOrder, updateToNextStage } from "../utils/leadStatusOrder";

export class LeadService {
    constructor(public leadRepository: LeadRepository) {
        this.leadRepository = leadRepository;
    }

    async createLead(data: LeadDTO): Promise<Lead> {
        const lead = new Lead();
        lead.name = data.name;
        lead.email = data.email;
        lead.phone = data.phone;
        lead.status = LeadStatus.UNASSIGNED
        lead.source = data.source || "website"; // Default to "website" if not provided
        lead.inquiryDate = new Date(); // Set the current date as createdAt
        return await this.leadRepository.save(lead);
    }

    async updateLead(data: LeadDTO): Promise<void | null> {
        let lead = await this.leadRepository.get(data.leadId as any); // UUIDs are strings
        
        if (!lead){
            return null;
        }else{
            if(lead?.status !== data.status) {
                const updated = await updateToNextStage(lead, data.status as LeadStatus);
                lead.status = updated.status!;
            }
    
            lead.name = data.name || lead.name;
            lead.email = data.email || lead.email;
            lead.phone = data.phone || lead.phone;
            lead.source = data.source || lead.source;
            lead.inquiryDate = data.inquiryDate || lead.inquiryDate;
    
            return await this.leadRepository.edit(lead.leadID,lead);
        }
    }

    async getById(id: string): Promise<Lead | null> {
        return await this.leadRepository.get(id);
    }

    async getAll(): Promise<Lead[]> {
        return await this.leadRepository.getAll();
    }
}


export const createLeadService = (
    leadRepository: LeadRepository
): LeadService => new LeadService(leadRepository);