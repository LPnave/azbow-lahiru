import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Lead } from "./lead"; // Assuming Lead model is imported
import { User } from "./user"; // Assuming User model is imported

@Entity()
export class LeadAssignment extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    assignmentID!: string; // UUID as Primary Key

    @ManyToOne(() => Lead, (lead) => lead.leadID, { eager: true })
    @JoinColumn({ name: "leadID" })
    lead!: Lead; // Foreign Key to Lead

    @ManyToOne(() => User, (user) => user.id, { eager: true })
    @JoinColumn({ name: "agentID" })
    agent!: User; // Foreign Key to User (Sales Agent)

    @Column()
    followUpStatus!: string; // FollowUpStatus (e.g., "In Progress", "Completed")

    @Column()
    preferredType!: string; // Preferred Type (e.g., Condo, House)

    @Column("decimal", { precision: 10, scale: 2 })
    budget!: number; // Budget (Decimal)

    @Column("text")
    notes!: string; // Notes (Text)
}
