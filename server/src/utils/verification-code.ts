export const VERIFICATION_CODE_TTL_MINUTES = 15;

export function generateVerificationCode(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
}

export function getVerificationCodeExpiration(): Date {
    return new Date(Date.now() + VERIFICATION_CODE_TTL_MINUTES * 60 * 1000);
}
