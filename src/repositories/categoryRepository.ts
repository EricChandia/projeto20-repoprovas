import { prisma } from './../database/prismaClient';


export async function findByName(name: string) {
  return prisma.category.findUnique({
    where: { name }
  });
}
