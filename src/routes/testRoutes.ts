import { Router } from 'express';
import { createTest } from '../controllers/testController';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { validateTokenMiddleware } from '../middlewares/validateToken';
import { testSchema } from '../schemas/testSchema';

const router = Router();

router.post('/repoprovas/tests/create', validateTokenMiddleware, validateSchemaMiddleware(testSchema), createTest);

export default router;
