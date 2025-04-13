import BaseRepository from "./base.repository";
import { Reservation } from "../model/reservation";

export class ReservationRepository extends BaseRepository<Reservation> {
    constructor() {
        super(Reservation); // Pass the Lead entity to BaseRepository
    }
}

export const reservationRepository = new ReservationRepository();
