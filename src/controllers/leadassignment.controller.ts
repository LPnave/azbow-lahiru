import { NextFunction, Request, Response } from "express";
import { leadAssignmentRepository, leadRepository, userRepository} from "../repositories";
import { HttpException } from "../utils/types";
import { createLeadAssignmentService } from "../services";
import { leadAssignmentSchema } from "../dto/leadassignment.dto";

const leadAssignmentService = createLeadAssignmentService(leadAssignmentRepository, leadRepository,userRepository);

export const getAll = async (_req: Request, res: Response) => {
    const users = await leadAssignmentService.getAll();
    res.json(users);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await leadAssignmentService.getById(id);
    if (user === null) {
        next(new HttpException(404, "User not found"));
    } else {
        res.json(user);
    }
};


export const createLeadAssignment = async (req: Request, res: Response, next:NextFunction) =>{
    try {
        const leadFromBody = leadAssignmentSchema.parse(req.body);  
        try {
            const lead = await leadAssignmentService.createLeadAssignment(leadFromBody);
            return res.status(201).json(lead);
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
  
      const updatedLead = await leadAssignmentService.updateLeadAssignment(leadFromBody);
      if (!updatedLead) {
        return next(new HttpException(404, "Lead not found"));
      }
  
      res.status(200).json(updatedLead);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };