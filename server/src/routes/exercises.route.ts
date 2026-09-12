import { Router } from "express";
import { ExercisesController } from "../controllers/exercises.controller.js";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.js";

export const exercisesRoutes = Router();

const exercisesController = new ExercisesController();

exercisesRoutes.get("/", ensureAuthenticated, exercisesController.list);
