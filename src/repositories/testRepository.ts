import { prisma } from './../database/prismaClient';
import { InsertTestData } from '../types/testTypes';

export async function findById(id: number) {
  return prisma.test.findUnique({
    where: { id }
  });
}

// export async function getTestsByDiscipline() {
//   return prisma.test.findMany({
//     include: {
//       category: true,
//       teacherDiscipline: { 
//         include: {
//           teacher: true, 
//           discipline: {
//           include: {
//             term: true,
//             },
//           },
//         },
//       },
//     },
    
//   });
// }

export async function getTestsByDiscipline() {
  return await prisma.term.findMany({
    where: {},
    distinct: ["number"],
    select: {
      number: true,
      discipline: {
        distinct: ["name"],
        select: {
          name: true,
          teacherDiscipline: {
            select: {
              teacher: { select: { name: true } },
              test: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
}


export async function getTestsByTeacher() {
  return await prisma.teacher.findMany({
    where: {},
    distinct: ["name"],
        select: {
          name: true,
          teacherDiscipline: {
            select: {
              discipline: { select: { name: true } },
              test: { distinct: ['categoryId'],
                select: {
                  category: {
                    select: { id: true, name: true, test: { select: { name: true } } }
                  }
                }
              ,orderBy: [{category: {name: "desc"}}]
              }
            }
          }
        }
      
    
  })
}


export async function insertTest(test: InsertTestData) {
  return prisma.test.create({
    data: test
  });
}
