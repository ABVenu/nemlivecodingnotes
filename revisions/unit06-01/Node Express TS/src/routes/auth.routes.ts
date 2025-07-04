import { Router } from 'express';
import { login, signup } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected route access granted!' });
});

export default router;
