import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Lead } from "./lead"; // Assuming Lead model is imported
import { Property } from "./property"; // Assuming Property model is imported

@Entity()
export class Sale extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    saleID!: string; // UUID as Primary Key

    @ManyToOne(() => Lead, (lead) => lead.leadID, { eager: true })
    @JoinColumn({ name: "leadID" })
    lead!: Lead; // Foreign Key to Lead (customer who bought the property)

    @ManyToOne(() => Property, (property) => property.propertyID, { eager: true })
    @JoinColumn({ name: "propertyID" })
    property!: Property; // Foreign Key to Property (property being sold)

    @Column("timestamp")
    saleDate!: Date; // Sale DateTime

    @Column("decimal", { precision: 10, scale: 2 })
    finalPrice!: number; // Final Negotiated Price (Decimal)

    @Column("text")
    commissionDetails!: string; // Details about the commission
}
