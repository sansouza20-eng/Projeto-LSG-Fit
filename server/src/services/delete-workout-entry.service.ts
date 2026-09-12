import { prisma } from "../database/prisma.js";
import { AppError } from "../utils/app-error.js";

type IRequestDto = {
    id: string;
    userId: string;
};

export class DeleteWorkoutEntryService {
    async execute(dto: IRequestDto) {
        const entry = await prisma.workoutEntry.findUnique({ where: { id: dto.id } });

        if (!entry || entry.userId !== dto.userId) {
            throw new AppError("Exercício do treino não encontrado.", 404);
        }

        await prisma.workoutEntry.delete({ where: { id: dto.id } });
    }
}
