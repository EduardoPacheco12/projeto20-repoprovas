import { Request, Response } from 'express';
import * as testService from '../services/testService';
import { testsBody } from '../types/testTypes';

export async function createTest(req: Request, res: Response) {
  const body: testsBody = req.body;

  await testService.createTest(body);
  res.status(201).send('Test created');
}
