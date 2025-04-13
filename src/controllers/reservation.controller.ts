import { NextFunction, Request, Response } from "express";
import { leadRepository, propertyRepository, reservationRepository} from "../repositories";
import { HttpException } from "../utils/types";
import { createReservationService } from "../services";
import { reservationSchema } from "../dto/reservation.dto";


const reservationService = createReservationService(reservationRepository,leadRepository,propertyRepository);

export const getAll = async (_req: Request, res: Response) => {
    const reservations = await reservationService.getAll();
    res.json(reservations);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const reservation = await reservationService.getById(id);
    if (reservation === null) {
        next(new HttpException(404, "Reservation not found"));
    } else {
        res.json(reservation);
    }
};

export const createReservation = async (req: Request, res: Response, next:NextFunction) =>{
    try {
        const leadFromBody = reservationSchema.parse(req.body);  
        try {
            const lead = await reservationService.createReservation(leadFromBody);
            return res.status(201).json(lead);
        } catch (error: any) {
            next(
                new HttpException(500,"Internal Server Error")
            );
        }
    }
    catch (error) {
        next(
            new HttpException(400,"Reservation object body is required")
        );
    }
} 

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateData = reservationSchema.parse(req.body);
  
      const updatedReservation = await reservationService.updateReservation(updateData);
      if (!updatedReservation) {
        return next(new HttpException(404, "Reservation not found"));
      }
  
      res.status(200).json(updatedReservation);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };