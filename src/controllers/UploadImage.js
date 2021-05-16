// import cloudinary from 'cloudinary/v2';
var cloudinary = require('cloudinary')
import dotenv from 'dotenv';

dotenv.config();

 cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
    cloud_name: "dz5ihdogk",
    api_key: "697754326399322",
    api_secret: "UgdgsOqb2OdU53NmMmE5mdgq3bk"
});

/**
 * @class UploadImage
 */

export default class UploadImage {

    static async uploadImage (req, res){
        console.log(`req:`,req.files)
        try {
            
        } catch (error) {
            console.log(`error`, error)
        }

    }
}