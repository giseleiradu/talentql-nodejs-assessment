// // import cloudinary from 'cloudinary/v2';
// var cloudinary = require('cloudinary')
// import dotenv from 'dotenv';

// dotenv.config();

//  cloudinary.config({ 
// //   cloud_name: process.env.CLOUDINARY_NAME, 
// //   api_key: process.env.CLOUDINARY_API_KEY, 
// //   api_secret: process.env.CLOUDINARY_API_SECRET
//     cloud_name: "dz5ihdogk",
//     api_key: "697754326399322",
//     api_secret: "UgdgsOqb2OdU53NmMmE5mdgq3bk"
// });

// /**
//  * @class UploadImage
//  */

// export default class UploadImage {

//     static async uploadImage (req, res){
//         console.log(`req:`,req.files)
//         try {

//         } catch (error) {
//             console.log(`error`, error)
//         }

//     }
// }




import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async images => {
  const result = await cloudinary.uploader.upload(images.path);
  return result.url;
};

const uploadImages = async images => Promise.all(
  images.map(async image => {
    const response = await cloudinary.uploader.upload(image.path);
    return response.url;
  })
);

export const uploader = async images => (Array.isArray(images) ? await uploadImages(images) : await uploadImage(images));