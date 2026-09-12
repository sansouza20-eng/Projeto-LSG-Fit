import type { Request, Response } from "express";
import { AuthenticateUserService } from "../services/authenticate-user.service.js";
import { AppError } from "../utils/app-error.js";

export class SessionsController {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const authenticateUser = new AuthenticateUserService();

            const result = await authenticateUser.execute(req.body);

            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.status).json({ message: error.message, code: error.code });
            }

            const message = error instanceof Error ? error.message : "Error when authenticate user";

            return res.status(401).json({ message });
        }
    }
}
