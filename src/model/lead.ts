import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// Enum for the lead status
export enum LeadStatus {
    UNASSIGNED = "Unassigned",
    ASSIGNED = "Assigned",
    RESERVED = "Reserved",
    LEGAL_IN_PROGRESS = "LegalInProgress",
    LEGAL_APPROVED = "LegalApproved",
    FINANCIAL_IN_PROGRESS = "FinancialInProgress",
    FINANCIAL_APPROVED = "FinancialApproved",
    SOLD = "Sold",
    CLOSED = "Closed",
}

// Enum for the source of the lead
export enum LeadSource {
    ZILLOW = "Zillow",
    FACEBOOK = "Facebook",
    LANDING_PAGE = "LandingPage",
    OTHER = "Other", 
}

@Entity()
export class Lead extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    leadID!: string; // UUID as Primary Key

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true })
    phone?: string; // Optional field

    @Column({ type: "enum", enum: LeadSource })
    source!: LeadSource; // Enum for Source

    @Column("timestamp")
    inquiryDate!: Date; // DateTime

    @Column({ type: "enum", enum: LeadStatus, default: LeadStatus.UNASSIGNED })
    status!: LeadStatus; // Enum for status
}
