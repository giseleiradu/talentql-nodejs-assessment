import express from 'express';
import post from './post';
import uploadImage from './uploadImage';

const router = express.Router();
router.use('/', post);
router.use('/upload', uploadImage);

export default router;

