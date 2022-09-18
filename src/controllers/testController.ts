import { Request, Response } from 'express';
import * as testService from '../services/testService';
import { testsBody } from '../types/testTypes';

export async function createTest(req: Request, res: Response) {
  const body: testsBody = req.body;

  await testService.createTest(body);
  res.status(201).send('Test created');
}

export async function getTestsDisciplines(req: Request, res: Response) {
  const result = await testService.getTestsDisciplines();

  res.status(200).send(result);
}

export async function getTestsTeachers(req: Request, res: Response) {
  const result = await testService.getTestsTeachers();

  res.status(200).send(result);
}
