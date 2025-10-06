const path = require("path");
const generateCode = require("./../utils/generateCode")
const fs = require("fs");
const multer = require("multer");

const uploadPath = path.join(__dirname, "..", "upload");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}
const storage = multer.diskStorage({
  destination : uploadPath,
  filename : (req,file,callback) =>{
    // the result : original-file-name-randome-code-extention
    const originalName = file.originalname // the name in req
    const extention = path.extname(originalName);
    const filename  = originalName.replace(extention,"");
    const compressedName = filename.split(" ").join("_");
    const lowerCaseName = compressedName.toLowerCase();
    const code = generateCode(12);
    const finalName = lowerCaseName+"_"+code+extention;
    callback(null,finalName);
  }
})
const upload = multer({
 storage,
 fileFilter : (req, file , cb) => {
  const mimeType = file.mimetype;
   const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];
  
  if (allowedTypes.includes(mimeType)) {
    cb(null, true); 
  } else {
    cb(new Error("Only .png, .jpg, .jpeg, and .pdf formats are allowed!"), false);
  }
 }
});

module.exports = upload;
