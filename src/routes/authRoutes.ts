import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchema.js';
import { signInSchema, signUpSchema } from '../schemas/authSchema.js';

const router = Router();

router.post('/repoprovas/sign-up', validateSchemaMiddleware(signUpSchema), signUp);
router.post('/repoprovas/sign-in', validateSchemaMiddleware(signInSchema), signIn);

export default router;
