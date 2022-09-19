import { Router } from 'express';
import { createTest, getTestsByDiscipline, getTestsByTeacher } from '../controllers/testController';
import { validateSchema } from '../middlewares/schemaMiddleware';
import { testSchema } from '../schemas/testSchema';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';

const testRouter = Router();

testRouter.use(ensureAuthenticatedMiddleware);
testRouter.post('/createTest', validateSchema(testSchema), createTest);
testRouter.get('/getTestsByDiscipline', getTestsByDiscipline);
testRouter.get('/getTestsByTeacher', getTestsByTeacher);


export default testRouter;
