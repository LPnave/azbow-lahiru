import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Lead } from "./lead"; // Assuming Lead model is imported
import { Property } from "./property"; // Assuming Property model is imported

// Enum for reservation status
export enum ReservationStatus {
    PENDING = "Pending",
    IN_PROGRESS = "In Progress",
    APPROVED = "Approved",
    CANCELLED = "Cancelled",
}

@Entity()
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    reservationID!: string; // UUID as Primary Key

    @ManyToOne(() => Lead, (lead) => lead.leadID, { eager: true })
    @JoinColumn({ name: "leadID" })
    lead!: Lead; // Foreign Key to Lead

    @ManyToOne(() => Property, (property) => property.propertyID, { eager: true })
    @JoinColumn({ name: "propertyID" })
    property!: Property; // Foreign Key to Property (can be string if needed)

    @Column("timestamp")
    reservationDate!: Date; // Reservation DateTime

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    reservationFee?: number; // Optional Reservation Fee

    @Column("timestamp", { nullable: true })
    expectedClosing?: Date; // Expected Closing DateTime

    @Column({ type: "enum", enum: ReservationStatus, default: ReservationStatus.PENDING })
    status!: ReservationStatus; // Enum for Status (Pending, FinancialApproved, etc.)

    @Column({ nullable: true })
    cancellationReason?: string; // Optional Cancellation Reason (if status = Cancelled)
}
