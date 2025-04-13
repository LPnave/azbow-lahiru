import { ReservationDTO } from "../dto/reservation.dto";
import { LeadStatus, Reservation, ReservationStatus } from "../model";
import {LeadRepository, PropertyRepository, ReservationRepository } from "../repositories";
import { updateToNextStage } from "../utils/leadStatusOrder";


export class ReservationService {
    constructor(
        public reservationRepository: ReservationRepository,
        public leadRepository: LeadRepository,
        public propertyRepository: PropertyRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.leadRepository = leadRepository;
        this.propertyRepository = propertyRepository;
    }

    async createReservation(data: ReservationDTO): Promise<Reservation> {
        
        const lead =  await this.leadRepository.get(data.leadID as any); // UUIDs are strings
        if (!lead) throw new Error("Lead not found");
        
        lead.status = LeadStatus.RESERVED; // Set the lead status to RESERVED
        
        const property = await this.propertyRepository.get(data.propertyID as any); // UUIDs are strings
        if (!property) throw new Error("Property not found");
        
        const reservation = new Reservation();

        reservation.lead = lead;
        reservation.property = property;
        reservation.reservationDate = data.reservationDate || new Date(); // Set the current date as createdAt
        reservation.reservationFee = data.reservationFee || 0; // Default to 0 if not provided
        reservation.expectedClosing = data.expectedClosing || new Date(); // Set the current date as createdAt
        reservation.status = ReservationStatus.PENDING; // Default to "PENDING" if not provided

        return await this.reservationRepository.save(reservation);
    }

    async updateReservation(data: ReservationDTO): Promise<void | null> {
        let reservation = await this.reservationRepository.get(data.reservationID as any); // UUIDs are strings
        
        if (!reservation){
            return null;
        }else{
            // Modifying the data only if the reservation is approved and set the lead status to Legal in progress
            if(reservation?.status == ReservationStatus.APPROVED) {
                const updatedLead = await updateToNextStage(reservation.lead, LeadStatus.LEGAL_IN_PROGRESS);
                reservation.lead.status = updatedLead.status!;
            }else{
                reservation.status = data.status || reservation.status;
            }
            reservation.reservationDate = data.reservationDate || reservation.reservationDate;
            reservation.reservationFee = data.reservationFee || reservation.reservationFee;
            reservation.expectedClosing = data.expectedClosing || reservation.expectedClosing;
            reservation.cancellationReason = data.cancellationReason || reservation.cancellationReason;
    
            return await this.reservationRepository.edit(reservation.reservationID,reservation);
        }
    }

    async getById(id: string): Promise<Reservation | null> {
        return await this.reservationRepository.get(id);
    }

    async getAll(): Promise<Reservation[]> {
        return await this.reservationRepository.getAll();
    }
}


export const createReservationService = (
    reservationRepository: ReservationRepository,
    leadRepository: LeadRepository,
    propertyRepository: PropertyRepository
): ReservationService => new ReservationService(reservationRepository, leadRepository, propertyRepository);