import { prisma } from "../database/prisma.js";
import { sendPasswordResetCodeEmail } from "./mailer.js";
import { generateVerificationCode, getVerificationCodeExpiration } from "../utils/verification-code.js";

type IRequestDto = {
    email: string;
}

const GENERIC_MESSAGE = "Se o e-mail existir, um código de redefinição foi enviado.";

export class RequestPasswordResetService {
    async execute(dto: IRequestDto) {
        const user = await prisma.user.findUnique({ where: { email: dto.email } });

        // Always return the same message, whether the e-mail exists or not,
        // so this endpoint can't be used to check which e-mails are registered.
        if (!user) {
            return { message: GENERIC_MESSAGE };
        }

        const resetCode = generateVerificationCode();

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordCode: resetCode,
                resetPasswordCodeExpiresAt: getVerificationCodeExpiration(),
            },
        });

        await sendPasswordResetCodeEmail(user.email, resetCode);

        return { message: GENERIC_MESSAGE };
    }
}
