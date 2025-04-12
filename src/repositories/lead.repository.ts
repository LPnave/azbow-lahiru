import BaseRepository from "./base.repository";
import { Lead } from "../model/lead";

export class LeadRepository extends BaseRepository<Lead> {
    constructor() {
        super(Lead); // Pass the Lead entity to BaseRepository
    }
}

export const leadRepository = new LeadRepository();
