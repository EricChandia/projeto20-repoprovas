import { prisma } from './../database/prismaClient';


export async function findByTeacherIdDisciplineId(teacherId: number, disciplineId:number) {
  return prisma.tearcherDiscipline.findFirst({
    where: { disciplineId, teacherId }
  });
}
