import { NextFunction, Request, Response } from "express";
import { leadAssignmentRepository, leadRepository, userRepository} from "../repositories";
import { HttpException } from "../utils/types";
import { createLeadAssignmentService } from "../services";
import { leadAssignmentSchema } from "../dto/leadassignment.dto";

const leadAssignmentService = createLeadAssignmentService(leadAssignmentRepository, leadRepository,userRepository);

export const getAll = async (_req: Request, res: Response) => {
    const leadAssignments = await leadAssignmentService.getAll();
    res.json(leadAssignments);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const leadAssignment = await leadAssignmentService.getById(id);
    if (leadAssignment === null) {
        next(new HttpException(404, "Lead Assignment not found"));
    } else {
        res.json(leadAssignment);
    }
};


export const createLeadAssignment = async (req: Request, res: Response, next:NextFunction) =>{
    try {
        const leadFromBody = leadAssignmentSchema.parse(req.body);  
        try {
            const leadAssignment = await leadAssignmentService.createLeadAssignment(leadFromBody);
            return res.status(201).json(leadAssignment);
        } catch (error: any) {
            next(
                new HttpException(500,"Internal Server Error")
            );
        }
    }
    catch (error) {
        next(
            new HttpException(400,"Lead Assignment object body is required")
        );
    }
} 

export const updateLeadAssignment = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const leadFromBody = leadAssignmentSchema.parse(req.body);  
  
      const updatedLeadAssignment = await leadAssignmentService.updateLeadAssignment(leadFromBody);
      if (!updatedLeadAssignment) {
        return next(new HttpException(404, "Lead Assignment not found"));
      }
  
      res.status(200).json(updatedLeadAssignment);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };