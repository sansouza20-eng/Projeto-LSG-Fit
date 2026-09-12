import type { Request, Response } from "express";
import { ListExercisesService } from "../services/list-exercises.service.js";
import { handleError } from "../utils/app-error.js";

export class ExercisesController {
    async list(req: Request, res: Response): Promise<Response> {
        try {
            const listExercises = new ListExercisesService();

            const muscleGroup = typeof req.query.muscleGroup === "string" ? req.query.muscleGroup : undefined;
            const exercises = await listExercises.execute({ muscleGroup });

            return res.status(200).json(exercises);
        } catch (error) {
            return handleError(error, res);
        }
    }
}
