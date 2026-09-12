import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "Missing authorization token" });
        return;
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
        res.status(401).json({ message: "Invalid authorization token" });
        return;
    }

    try {
        req.userId = verifyToken(token);
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}
