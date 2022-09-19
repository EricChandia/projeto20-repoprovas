import Joi from 'joi';
import { NewTestData } from '../types/testTypes';

export const testSchema = Joi.object<NewTestData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required().uri(),
  category: Joi.string().required(),
  discipline: Joi.string().required(),
  teacher: Joi.string().required()
});
