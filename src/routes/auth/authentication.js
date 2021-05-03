import express from 'express';
import User from '../../controllers/Users';
import checkToken from '../../middlewares/checkToken';

const router = express.Router();

router.post(
  '/signup',
  User.signUp
);
router.post(
  '/signin',
  User.logIn
);
router.delete(
  '/signout', checkToken,
  User.signOut
);
export default router;