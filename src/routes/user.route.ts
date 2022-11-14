import express from 'express';
import {
  getAllUserHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// fetching users route
router.get('/', restrictTo('admin'), getAllUserHandler);

// Get users personal info route
router.get('/me', getMeHandler);

export default router;