import { DeepPartial } from "typeorm";
import { Lead, LeadStatus } from "../model/lead";

export const leadStatusOrder: LeadStatus[] = [
    LeadStatus.UNASSIGNED,
    LeadStatus.ASSIGNED,
    LeadStatus.RESERVED,
    LeadStatus.LEGAL_IN_PROGRESS,
    LeadStatus.LEGAL_APPROVED,
    LeadStatus.FINANCIAL_IN_PROGRESS,
    LeadStatus.FINANCIAL_APPROVED,
    LeadStatus.SOLD,
    // LeadStatus.CLOSED,
];

export const allowedToCloseStages = [
    LeadStatus.RESERVED,
    LeadStatus.LEGAL_IN_PROGRESS,
    LeadStatus.LEGAL_APPROVED,
    LeadStatus.FINANCIAL_IN_PROGRESS,
    LeadStatus.FINANCIAL_APPROVED,
];

/**
 * Function to update the lead status to the next stage in the defined order.
 * @param lead - The lead object to be updated.
 * @param nextStage - The next stage to which the lead should be updated.
 * @returns The updated lead object with the new status.
 * @throws Error if the next stage is invalid or if the transition is not allowed.
 */

// This function updates the lead status to the next stage in the defined order.
// It checks if the next stage is valid and if the transition is allowed based on the current status.
// If the next stage is CLOSED, it checks if the current status allows for closure.
// If the transition is not allowed, it throws an error.
export const updateToNextStage = (
    lead: Lead,
    nextStage: LeadStatus
): DeepPartial<Lead> => {
    // Special handling for CLOSED
    if (nextStage === LeadStatus.CLOSED) {
        if (!allowedToCloseStages.includes(lead.status)) {
            throw new Error(
                `Cannot move to CLOSED stage from current stage: ${lead.status}`
            );
        }
        return {
            ...lead,
            status: nextStage,
        };
    }

    const currentStageIndex = leadStatusOrder.indexOf(lead.status);
    const nextStageIndex = leadStatusOrder.indexOf(nextStage);

    if (nextStageIndex === -1) {
        throw new Error("Invalid next stage");
    }
    if (nextStageIndex !== currentStageIndex + 1) {
        throw new Error(
            `Invalid stage transition: Cannot move from ${lead.status} to ${nextStage}`
        );
    }

    return {
        ...lead,
        status: nextStage,
    };
};