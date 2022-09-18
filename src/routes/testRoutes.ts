import { Router } from 'express';
import { createTest, getTestsDisciplines, getTestsTeachers } from '../controllers/testController';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { validateTokenMiddleware } from '../middlewares/validateToken';
import { testSchema } from '../schemas/testSchema';

const router = Router();

router.post('/repoprovas/tests/create', validateTokenMiddleware, validateSchemaMiddleware(testSchema), createTest);
router.get('/repoprovas/tests/disciplines', validateTokenMiddleware, getTestsDisciplines);
router.get('/repoprovas/tests/teachers', validateTokenMiddleware, getTestsTeachers);

export default router;
