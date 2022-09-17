import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { signInSchema, signUpSchema } from '../schemas/authSchema';

const router = Router();

router.post('/repoprovas/sign-up', validateSchemaMiddleware(signUpSchema), signUp);
router.post('/repoprovas/sign-in', validateSchemaMiddleware(signInSchema), signIn);

export default router;
