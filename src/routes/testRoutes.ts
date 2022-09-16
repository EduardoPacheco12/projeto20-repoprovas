import { Router } from 'express';
import { createTest } from '../controllers/testController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchema.js';
import { validateTokenMiddleware } from '../middlewares/validateToken.js';
import { testSchema } from '../schemas/testSchema.js';

const router = Router();

router.post('/repoprovas/tests/create', validateTokenMiddleware, validateSchemaMiddleware(testSchema), createTest);

export default router;
