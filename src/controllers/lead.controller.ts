import { NextFunction, Request, Response } from "express";
import { leadRepository} from "../repositories";
import { HttpException } from "../utils/types";
import { createLeadService } from "../services";
import * as z from "zod";
import { LeadSource, LeadStatus } from "../model";

const leadService = createLeadService(leadRepository);

const leadSchema = z.object({
    leadId: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    status: z.nativeEnum(LeadStatus),
    source: z.nativeEnum(LeadSource),
    inquiryDate: z.date(),
});

export const getAll = async (_req: Request, res: Response) => {
    const leads = await leadService.getAll();
    res.json(leads);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const lead = await leadService.getById(id);
    if (lead === null) {
        next(new HttpException(404, "Lead not found"));
    } else {
        res.json(lead);
    }
};

export const createLead = async (req: Request, res: Response, next:NextFunction) =>{
    try {
        const leadFromBody = leadSchema.parse(req.body);  
        try {
            const lead = await leadService.createLead(leadFromBody);
            return res.status(201).json(lead);
        } catch (error: any) {
            next(
                new HttpException(500,"Internal Server Error")
            );
        }
    }
    catch (error) {
        next(
            new HttpException(400,"Lead object body is required")
        );
    }
} 

export const updateLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateData = leadSchema.parse(req.body);
  
      const updatedLead = await leadService.updateLead(updateData);
      if (!updatedLead) {
        return next(new HttpException(404, "Lead not found"));
      }
  
      res.status(200).json(updatedLead);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };