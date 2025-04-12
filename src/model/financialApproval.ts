import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm";
import { Reservation } from "./reservation";

export enum FinancialStatus {
    APPROVED = "Approved",
    REJECTED = "Rejected",
}

@Entity()
export class FinancialApproval extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    approvalID!: string;

    @ManyToOne(() => Reservation, { eager: true })
    @JoinColumn({ name: "reservationID" })
    reservation!: Reservation;

    @Column({
        type: "enum",
        enum: FinancialStatus,
    })
    financialStatus!: FinancialStatus;

    @Column("decimal", { precision: 10, scale: 2 })
    loanAmount!: number;

    @Column("text", { nullable: true })
    paymentPlan?: string;
}
