import { Response, Request } from "express";
import * as testService from '../services/testService';
import { NewTestData } from "../types/testTypes";

export async function createTest(req: Request, res: Response) {
    const newTest:NewTestData = req.body;
    
    const testCreated = await testService.createTest(newTest);

    res.status(201).send(testCreated);
}
  

export async function getTestsByDiscipline(req: Request, res: Response) {
    
    const testsByDiscipline = await testService.getTestsByDiscipline();

    res.status(200).send(testsByDiscipline);
}
  

export async function getTestsByTeacher(req: Request, res: Response) {
    
    const testsByTeacher = await testService.getTestsByTeacher();

    res.status(200).send(testsByTeacher);
}
  