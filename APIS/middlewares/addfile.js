//import cloudinary related modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");



//configure cloudinary
cloudinary.config({
    cloud_name: 'djqbwmvjg',
    api_key: '492171555336437',
    api_secret: 'OO5HtI8g0gpuIZyjR3m1jXa9-KE'
});


//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'CDB21DX003',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})


//configure multer
const multerObj = multer({ storage: clStorage })






module.exports = multerObj;