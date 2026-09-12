import { Router } from "express";
import { usersRoutes } from "./users.route.js";
import { sessionsRoutes } from "./sessions.route.js";
import { exercisesRoutes } from "./exercises.route.js";
import { workoutPlanRoutes } from "./workout-plan.route.js";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/exercises", exercisesRoutes);
routes.use("/workout-plan", workoutPlanRoutes);