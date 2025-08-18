const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    },
})
const upload = multer({storage : storage})

const image = upload.single('image');
const thumbnail = upload.single("thumbnail");

module.exports = {image,thumbnail}
