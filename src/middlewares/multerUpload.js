import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import cloudinaryConfig from '../config/cloudinary';

dotenv.config();
const { NODE_ENV } = process.env;
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // Maximum allowed image size: 1MB

const cdnConnect = cloudinaryConfig();

// const storage = multer.diskStorage({
//     destination: function (request, file, callback) {
//         callback(null, './uploads/');
//     },
//     filename: function (request, file, callback) {
//         console.log(file);
//         callback(null, file.originalname)
//     }
// });
const storage = cloudinaryStorage({
  cloudinary,
  folder: NODE_ENV !== 'test' ? cdnConnect.cloud_name : 'tests',
  allowedFormat: ['jpg', 'png', 'jpeg']
});
const multerUploads = multer({
   dest    : './uploads/',
    onError : function(err, next) {
      console.log('error', err);
      next(err);
    },
  storage,
  // limits: { fileSize: MAX_IMAGE_SIZE }
});

console.log(`multerUploads`, multerUploads)
export default multerUploads;



