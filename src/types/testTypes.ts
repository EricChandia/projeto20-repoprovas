import { Test } from "@prisma/client";

export type InsertTestData = Omit<Test, 'id'> ;
export type NewTestData = {
    name:string,
    pdfUrl:string,
    category:string,
    discipline:string,
    teacher:string
}