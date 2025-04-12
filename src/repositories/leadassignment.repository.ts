import BaseRepository from "./base.repository";
import { Lead } from "../model/lead";
import { LeadAssignment } from "../model/leadAssignment";

export class LeadAssignmentRepository extends BaseRepository<LeadAssignment> {
    constructor() {
        super(LeadAssignment); // Pass the Lead entity to BaseRepository
    }
}

export const leadAssignmentRepository = new LeadAssignmentRepository();
