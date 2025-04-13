import { LeadAssignmentDto } from "../dto/leadassignment.dto";
import { Lead, LeadAssignment, LeadStatus } from "../model";
import { LeadAssignmentRepository, LeadRepository, UserRepository } from "../repositories";
import { updateToNextStage } from "../utils/leadStatusOrder";



export class LeadAssignmentService {
    constructor(
        public leadAssignmentRepository: LeadAssignmentRepository,
        public leadRepository: LeadRepository,
        public userRepository: UserRepository
    ) {
        this.leadAssignmentRepository = leadAssignmentRepository;
        this.leadRepository = leadRepository;
        this.userRepository = userRepository;
    }

    async createLeadAssignment(data: LeadAssignmentDto): Promise<LeadAssignment> {

        const lead = await this.leadRepository.get(data.leadID as any); // UUIDs are strings
        if (!lead) throw new Error("Lead not found");

        const user = await this.userRepository.get(data.agentID as any); // UUIDs are strings
        if (!user) throw new Error("User not found");

        const leadAssignment = new LeadAssignment();
        const updatedLead = await updateToNextStage(lead, LeadStatus.ASSIGNED);; // Set the lead status to ASSIGNED
        lead.status = updatedLead.status!;

        leadAssignment.lead = lead;
        leadAssignment.agent = user;
        leadAssignment.followUpStatus = data.followUpStatus || "In Progress"; // Default to "In Progress" if not provided
        leadAssignment.preferredType = data.preferredType || "Generic"; // Default to "Condo" if not provided
        leadAssignment.budget = data.budget || 0; // Default to 0 if not provided
        leadAssignment.notes = data.notes || ""; // Default to empty string if not provided 


        return await this.leadAssignmentRepository.save(data);
    }

    async updateLeadAssignment(data: LeadAssignmentDto): Promise<void | null> {
       
        const leadAssignment = await this.leadAssignmentRepository.get(data.assignmentId as any); // UUIDs are strings
        if (!leadAssignment) return null;
        //Modifying the data only if it is requried
        if(leadAssignment.lead.leadID !== data.leadID) {
            const lead = await this.leadRepository.get(data.leadID as any); // UUIDs are strings
            if (!lead) {
                throw new Error("Lead not found");
            }else{
                leadAssignment.lead = lead;
            }
        }
        if(leadAssignment.agent.userId !== data.agentID) {
            const user = await this.userRepository.get(data.agentID as any); // UUIDs are strings
            if (!user) {
                throw new Error("User not found");
            }else{
                leadAssignment.agent = user;
            }
        }

        leadAssignment.followUpStatus = data.followUpStatus || leadAssignment.followUpStatus;
        leadAssignment.preferredType = data.preferredType || leadAssignment.preferredType; // Default to "Condo" if not provided
        leadAssignment.budget = data.budget || leadAssignment.budget; // Default to 0 if not provided
        leadAssignment.notes = data.notes || leadAssignment.notes; // Default to empty string if not provided

        return await this.leadAssignmentRepository.edit(leadAssignment.assignmentID,leadAssignment);
    }

    async getById(id: string): Promise<LeadAssignment | null> {
        return await this.leadAssignmentRepository.get(id);
    }

    async getAll(): Promise<LeadAssignment[]> {
        return await this.leadAssignmentRepository.getAll();
    }
}


export const createLeadAssignmentService = (
    leadAssignmentRepository: LeadAssignmentRepository,
    leadRepository: LeadRepository,
    userRepository: UserRepository
): LeadAssignmentService => new LeadAssignmentService(leadAssignmentRepository, leadRepository, userRepository);