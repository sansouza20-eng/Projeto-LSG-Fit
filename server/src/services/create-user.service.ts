import { hash } from "argon2";
import { prisma } from "../database/prisma.js";
import { sendVerificationCodeEmail } from "./mailer.js";
import { AppError } from "../utils/app-error.js";
import { generateVerificationCode, getVerificationCodeExpiration } from "../utils/verification-code.js";

type IRequestDto = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export class CreateUserService {
    async execute(dto: IRequestDto) {
        if (dto.password !== dto.confirmPassword) {
            throw new AppError("Passwords do not match");
        }

        const emailInUse = await prisma.user.findUnique({ where: { email: dto.email } });

        if (emailInUse) {
            throw new AppError("Email already in use");
        }

        const hashedPassword = await hash(dto.password);
        const verificationCode = generateVerificationCode();

        const user = await prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                verificationCode,
                verificationCodeExpiresAt: getVerificationCodeExpiration(),
            },
        });

        await sendVerificationCodeEmail(user.email, verificationCode);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            message: "Cadastro criado. Verifique o código enviado para o seu e-mail.",
        };
    }
}
