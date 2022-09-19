import supertest from 'supertest';
import app from '../src/index';
import { prisma } from '../src/database/prismaClient'
import userFactory from './factories/userFactory';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`;
  });


  describe('Testa a rota Post /getTestsByDiscipline', () => {
    it('Deve obter através de um get os dados dos tests separados por disciplinas, retornar o código 200', async () => {

        const newUserTest =  {
            email: "userTest@test.com",
            password: "test123456",
            confirmPassword: "test123456"
        }

        const register = await supertest(app).post('/signUp').send(newUserTest);

        delete newUserTest.confirmPassword;
        const login = await supertest(app).post('/signIn').send(newUserTest)
        
        const { token } = login.body;
        const result = await supertest(app).get(`/getTestsByDiscipline`).set({Authorization: `Bearer ${token}`});

    
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
      });
})




describe('Testa a rota Post /getTestsByTeacher', () => {
    it('Deve obter através de um get os dados dos tests separados por disciplinas, retornar o código 200', async () => {

        const newUserTest =  {
            email: "userTest@test.com",
            password: "test123456",
            confirmPassword: "test123456"
        }
        
        const register = await supertest(app).post('/signUp').send(newUserTest);

        delete newUserTest.confirmPassword;
        const login = await supertest(app).post('/signIn').send(newUserTest)
        
        const { token } = login.body;
        const result = await supertest(app).get(`/getTestsByTeacher`).set({Authorization: `Bearer ${token}`});

    
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
      });
})


afterAll(async () => {
    prisma.$disconnect();
  });
