import { NextFunction, Request, Response } from "express";
import { propertyRepository} from "../repositories";
import { HttpException } from "../utils/types";

import { createPropertyService } from "../services/property.service";
import { propertySchema } from "../dto/property.dto";

const propertyService = createPropertyService(propertyRepository);

export const getAll = async (_req: Request, res: Response) => {
    const users = await propertyService.getAll();
    res.json(users);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await propertyService.getById(id);
    if (user === null) {
        next(new HttpException(404, "Lead not found"));
    } else {
        res.json(user);
    }
};

export const createProperty = async (req: Request, res: Response, next:NextFunction) =>{
    try {
        const propertyFromBody = propertySchema.parse(req.body);  
        try {
            const lead = await propertyService.createProperty(propertyFromBody);
            return res.status(201).json(lead);
        } catch (error: any) {
            next(
                new HttpException(500,"Internal Server Error")
            );
        }
    }
    catch (error) {
        next(
            new HttpException(400,"Property object body is required")
        );
    }
} 

export const updateProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateData = propertySchema.parse(req.body);
  
      const updatedLead = await propertyService.updateProperty(updateData);
      if (!updatedLead) {
        return next(new HttpException(404, "Lead not found"));
      }
  
      res.status(200).json(updatedLead);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };