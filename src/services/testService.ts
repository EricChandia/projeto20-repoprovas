import { NewTestData } from "../types/testTypes";
import { InsertTestData } from "../types/testTypes";
import * as teacherRepository from "../repositories/teacherRepository";
import * as disciplineRepository from "../repositories/disciplineRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as teacherDispclineRepository from "../repositories/teacherDisciplineRepository";
import * as testRepository from "../repositories/testRepository";
import {
    conflictError,
    notFoundError,
    unauthorizedError
  } from '../utils/errorUtils';
  

export async function createTest(newTest:NewTestData) {
    
    const teacher = await teacherRepository.findByName(newTest.teacher);
    if(!teacher){
        throw notFoundError("This teacher is not registered");
    }

    const discipline = await disciplineRepository.findByName(newTest.discipline);
    if(!discipline){
        throw notFoundError("This discipline does not exists");
    }

    const category = await categoryRepository.findByName(newTest.category);
    if(!category){
        throw notFoundError("This category does not exists");
    }

    const teacherDiscipline = await teacherDispclineRepository.findByTeacherIdDisciplineId(teacher.id, discipline.id);
    if(!teacherDiscipline){
        throw(notFoundError("This teacher or discipline is not correct"));
    }

    const insertTest:InsertTestData = {
        name:newTest.name,
        pdfUrl:newTest.pdfUrl,
        categoryId:category.id,
        teacherDisciplineId: teacherDiscipline.id
    }
    
    return testRepository.insertTest(insertTest);

}


export async function getTestsByDiscipline(){
    const tests = await testRepository.getTestsByDiscipline();
    if(!tests){
        throw notFoundError();
    }

    return tests;
}



export async function getTestsByTeacher(){

    const tests =  await testRepository.getTestsByTeacher();

    if(!tests){
        throw notFoundError();
    }

    return tests;
}