const path = require("path");
const {uploadFileToUploadcare} = require("./../utils/uploadcare");
const {File} = require("./../models");
const { MIMEType } = require("util");
const upload = async (req,res,next) => {
 try {
   const {file} = req;
   const ext = path.extname(file);
   const result = await uploadFileToUploadcare({file,ext});
   if(!result){
      error = new Error("file not uploaded!");
      error.statusCode = 400;
      return next(err)
   }
   const newFile = new File({
     filename: result.originalname,
     url: result.cdnUrl,
     size: result.size ,
     mimetype : ext ,
     createBy : req.user._id
   });
   await newFile.save();
   res.status(200).json({
      code: 200,
      data : result
   })
 } catch (error) {
   console.log(error);
   return next(error)
 }   
};
module.exports = {upload}