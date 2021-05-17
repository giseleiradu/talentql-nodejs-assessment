import express from 'express';
// import UploadImage from '../../controllers/UploadImage';
// import multer from '../../middlewares/multerUpload';
import uploader from '../../controllers/UploadImage';

const router = express.Router();

router.post('/upload', () =>{uploader});

export default router;