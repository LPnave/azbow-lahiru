import { NextFunction, Request, Response } from "express";
import { propertyRepository} from "../repositories";
import { HttpException } from "../utils/types";

import { createPropertyService } from "../services/property.service";
import { propertySchema } from "../dto/property.dto";

const propertyService = createPropertyService(propertyRepository);

export const getAll = async (_req: Request, res: Response) => {
    const properties = await propertyService.getAll();
    res.json(properties);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const property = await propertyService.getById(id);
    if (property === null) {
        next(new HttpException(404, "Property not found"));
    } else {
        res.json(property);
    }
};

export const createProperty = async (req: Request, res: Response, next:NextFunction) =>{
    try {
        const propertyFromBody = propertySchema.parse(req.body);  
        try {
            const property = await propertyService.createProperty(propertyFromBody);
            return res.status(201).json(property);
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
  
      const updateProperty = await propertyService.updateProperty(updateData);
      if (!updateProperty) {
        return next(new HttpException(404, "Property not found"));
      }
  
      res.status(200).json(updateProperty);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };