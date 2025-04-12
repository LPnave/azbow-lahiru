import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// Enum for property types
export enum PropertyType {
    HOUSE = "House",
    CONDO = "Condo",
    APARTMENT = "Apartment",
}

// Enum for property status
export enum PropertyStatus {
    AVAILABLE = "Available",
    RESERVED = "Reserved",
    SOLD = "Sold",
}

@Entity()
export class Property extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    propertyID!: string; // UUID as Primary Key

    @Column()
    title!: string; // Property Title

    @Column()
    location!: string; // Location (City / Area / Address)

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number; // Listed Price

    @Column({ type: "enum", enum: PropertyType })
    type!: PropertyType; // Property Type (House, Condo, Apartment)

    @Column({ type: "enum", enum: PropertyStatus, default: PropertyStatus.AVAILABLE })
    status!: PropertyStatus; // Property Status (Available, Reserved, Sold)

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date; // DateTime when the property was created

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date; // DateTime when the property was last updated
}
