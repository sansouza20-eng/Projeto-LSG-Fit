import type { Request, Response } from "express";
import { GetWorkoutPlanService } from "../services/get-workout-plan.service.js";
import { AddWorkoutEntryService } from "../services/add-workout-entry.service.js";
import { UpdateWorkoutEntryService } from "../services/update-workout-entry.service.js";
import { DeleteWorkoutEntryService } from "../services/delete-workout-entry.service.js";
import { handleError } from "../utils/app-error.js";

export class WorkoutPlanController {
    async list(req: Request, res: Response): Promise<Response> {
        try {
            const getWorkoutPlan = new GetWorkoutPlanService();

            const plan = await getWorkoutPlan.execute(req.userId);

            return res.status(200).json(plan);
        } catch (error) {
            return handleError(error, res);
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const addWorkoutEntry = new AddWorkoutEntryService();

            const entry = await addWorkoutEntry.execute({ ...req.body, userId: req.userId });

            return res.status(201).json(entry);
        } catch (error) {
            return handleError(error, res);
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const updateWorkoutEntry = new UpdateWorkoutEntryService();

            const entry = await updateWorkoutEntry.execute({
                ...req.body,
                id: req.params.id as string,
                userId: req.userId,
            });

            return res.status(200).json(entry);
        } catch (error) {
            return handleError(error, res);
        }
    }

    async remove(req: Request, res: Response): Promise<Response> {
        try {
            const deleteWorkoutEntry = new DeleteWorkoutEntryService();

            await deleteWorkoutEntry.execute({ id: req.params.id as string, userId: req.userId });

            return res.status(204).send();
        } catch (error) {
            return handleError(error, res);
        }
    }
}
