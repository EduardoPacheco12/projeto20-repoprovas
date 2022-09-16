import { categories, disciplines, teachers, teachersDisciplines, tests } from '@prisma/client';

interface test {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}

export type testsPrismaSchema = tests;
export type disciplinesPrismaSchema = disciplines;
export type teachersPrismaSchema = teachers;
export type teachersDisciplinesPrismaSchema = teachersDisciplines;
export type categoriesPrismaSchema = categories;

export type testsBody = test;
