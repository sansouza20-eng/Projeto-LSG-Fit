-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reset_password_code" TEXT,
ADD COLUMN     "reset_password_code_expires_at" TIMESTAMP(3),
ADD COLUMN     "verification_code" TEXT,
ADD COLUMN     "verification_code_expires_at" TIMESTAMP(3);
