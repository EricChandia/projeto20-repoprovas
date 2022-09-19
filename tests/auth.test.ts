import supertest from 'supertest';
import app from '../src/index';
import { prisma } from '../src/database/prismaClient'
import userFactory from './factories/userFactory';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`;
  });

  const user = userFactory();
  
describe('Testa a rota Post /signUp', () => {
    it('Deve criar um usuário e retornar status 201', async () => {
        
        const result = await supertest(app).post(`/signUp`).send(user);
    
        const createdUser = await prisma.user.findUnique({
          where: { email: user.email }
        });
    
        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull();
      });

      it('Deve tentar criar um usuário que já existe e retornar erro 409', async () => {
        
        await supertest(app).post(`/signUp`).send(user);
        const result = await supertest(app).post(`/signUp`).send(user);
    
        const createdUser = await prisma.user.findUnique({
          where: { email: user.email }
        });
    
        expect(result.status).toBe(409);
      });

      it('Deve fornecer dados errados para o signUp e retornar um erro 422', async () => {
        
        const result = await supertest(app).post(`/signUp`).send({email: "asdasda", pass: "ddddd"});
  
        expect(result.status).toBe(422);
      });

})

describe('Testa a rota Post /signIn', () => {
    it('Deve cadastrar e logar com um usuário, receber um token e o código 200', async () => {

        await supertest(app).post(`/signUp`).send(user);
    
        const result = await supertest(app).post(`/signIn`).send({email: user.email, password: user.password});

        expect(result.status).toBe(200);
        expect(result.body.token).not.toBeNull();
      });

      it('Deve tentar logar com um usuário que não existe e receber um erro 401', async () => {

        const newUser = { email: "naoexisto@na.com", password: "naoexistopass" }
    
        const result = await supertest(app).post(`/signIn`).send(newUser);
  
        expect(result.status).toBe(401);
      });

      it('Deve fornecer dados errados para o signUp e retornar um erro 422', async () => {
        
        const result = await supertest(app).post(`/signUp`).send({email: "asdasda", pass: "ddddd"});
  
        expect(result.status).toBe(422);
      });
})



afterAll(async () => {
  prisma.$disconnect;
});