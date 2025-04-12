import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm";
import { Reservation } from "./reservation";

@Entity()
export class LegalProceeding extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    legalID!: string;

    @ManyToOne(() => Reservation, { eager: true })
    @JoinColumn({ name: "reservationID" })
    reservation!: Reservation;

    @Column("boolean")
    contractSigned!: boolean;

    @Column("text")
    legalNotes!: string;
}
