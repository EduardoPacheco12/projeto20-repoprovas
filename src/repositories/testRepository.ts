import { client } from '../databases/postgres';

export async function searchCategory(category: string) {
  return await client.categories.findUnique({
    where: {
      name: category,
    },
  });
}

export async function searchDiscipline(discipline: string) {
  return await client.disciplines.findUnique({
    where: {
      name: discipline,
    },
  });
}

export async function searchTeacher(teacher: string) {
  return await client.teachers.findUnique({
    where: {
      name: teacher,
    },
  });
}

export async function searchTeachersDisciplines(teacherId: number, disciplineId: number) {
  return await client.teachersDisciplines.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });
}

export async function insertTest(name: string, pdfUrl: string, categoryId: number, teacherDisciplineId: number) {
  return await client.tests.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId,
    },
  });
}

export async function searchTestsDisciplines() {
  return client.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          teachersDisciplines: {
            select: {
              tests: {
                select: {
                  name: true,
                  pdfUrl: true,
                  categories: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              teachers: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
