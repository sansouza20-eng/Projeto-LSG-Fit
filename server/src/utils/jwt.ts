import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(userId: string): string {
    return jwt.sign({}, JWT_SECRET, { subject: userId });
}

export function verifyToken(token: string): string {
    const payload = jwt.verify(token, JWT_SECRET);

    return (payload as jwt.JwtPayload).sub!;
}
