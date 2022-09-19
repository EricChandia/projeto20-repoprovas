import { prisma } from './../database/prismaClient';


export async function findByName(name: string) {
  return prisma.teacher.findUnique({
    where: { name }
  });
}
