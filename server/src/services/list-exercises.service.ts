import { prisma } from "../database/prisma.js";

type IRequestDto = {
    muscleGroup?: string | undefined;
};

export class ListExercisesService {
    async execute(dto: IRequestDto) {
        return prisma.exercise.findMany({
            ...(dto.muscleGroup ? { where: { muscleGroup: dto.muscleGroup } } : {}),
            orderBy: [{ muscleGroup: "asc" }, { name: "asc" }],
        });
    }
}
