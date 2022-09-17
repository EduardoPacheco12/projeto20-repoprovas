import Joi from 'joi';
import { testsBody } from '../types/testTypes';

export const testSchema = Joi.object<testsBody>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  category: Joi.string().required(),
  discipline: Joi.string().required(),
  teacher: Joi.string().required(),
});
