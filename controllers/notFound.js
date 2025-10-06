const notFound = (req,res,next) => {
    res.status(404).json({
        code : "404",
        status : false ,
        message : "API not found"
    });
    console.log("API not found");   
}
module.exports = notFound 