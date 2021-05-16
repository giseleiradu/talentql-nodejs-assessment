import express from 'express';
import UploadImage from '../../controllers/UploadImage';
import multer from '../../middlewares/multerUpload';

const router = express.Router();

router.post('/upload',multer.array('images'), UploadImage.uploadImage);

export default router;