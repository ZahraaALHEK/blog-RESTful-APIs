const errorHandel = (error,req,res,next)=>{
  const code = error.statusCode || 500;
    res.status(code).json({
        code ,
        status : false ,
        message : error.message
    })
}
module.exports = errorHandel; 