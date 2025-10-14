const path = require("path");
const {File} = require("./../models/index")
const  {valideExt}  = require("./../validators/fileValidator");
const {uploadFileToS3} = require("./../utils/awsS3");
const upload = async (req,res,next) => {
 try {
   const {file} = req;
   if(!file){
      const err = new Error("file is required");
      err.codeStatus = 400;
      return next(err);
   }
   const ext = path.extname(file.originalname);
   if(!valideExt(ext)){
      const err = new Error("Only .png, .jpg, .jpeg, and .pdf formats are allowed!");
      err.codeStatus = 400;
      return next(err);
   }
   const key = await uploadFileToS3({file,ext});
   if(key){
      const newFile = new File({
         key ,
         size : file.size ,
         mimetype : mimetype ,
         createBy : req.user._id
      });
      await newFile.save();
      res.status(200).json({
      status : true,
      code: 200,
      data : key
   })
   }else{
      const err = new Error("file not saved in db");
      err.codeStatus = 400;
      return next(err);
   }

} catch (error) {
    console.log(error);
    return next(error);
}   
};
const getSignedURl = async (req,res,next) => {
   try {
      const {key} = req.query;
      const url = await getSignedURl(key);
      if(!url){
      const err = new Error("url not found");
      err.codeStatus = 404;
      return next(err);
      }
      res.status(200).json({
         code : 200 ,
         message : "Get signed successfully" ,
         data : {url}
      })
   } catch (error) {
      console.log(error);
    return next(error);
   }
}
module.exports = {upload,getSignedURl}