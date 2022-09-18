import * as testRepository from '../repositories/testRepository';
import {
  categoriesPrismaSchema,
  disciplinesPrismaSchema,
  teachersDisciplinesPrismaSchema,
  teachersPrismaSchema,
  testsBody,
} from '../types/testTypes';

export async function createTest(body: testsBody) {
  const name: string = body.name;
  const pdfUrl: string = body.pdfUrl;
  const category: string = body.category;
  const discipline: string = body.discipline;
  const teacher: string = body.teacher;

  const verifyCategory: categoriesPrismaSchema = (await testRepository.searchCategory(category))!;
  if (!verifyCategory) {
    throw { type: 'not_found', message: 'Category not found' };
  }

  const verifyTeacher: teachersPrismaSchema = (await testRepository.searchTeacher(teacher))!;
  if (!verifyTeacher) {
    throw { type: 'not_found', message: 'Teacher not found' };
  }

  const verifyDiscipline: disciplinesPrismaSchema = (await testRepository.searchDiscipline(discipline))!;
  if (!verifyDiscipline) {
    throw { type: 'not_found', message: 'Discipline not found' };
  }

  const verifyTeachersDisciplines: teachersDisciplinesPrismaSchema = (await testRepository.searchTeachersDisciplines(
    verifyTeacher.id,
    verifyDiscipline.id
  ))!;
  if (!verifyTeachersDisciplines) {
    throw { type: 'not_found', message: 'This teacher is not teaching this discipline' };
  }

  await testRepository.insertTest(name, pdfUrl, verifyCategory.id, verifyTeachersDisciplines.id);
}

export async function getTestsDisciplines() {
  const result = await testRepository.searchTestsDisciplines();

  return result;
}
