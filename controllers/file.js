const upload = async (req,res,next) => {
 try {
    res.status(200).json({code: 200})
 } catch (error) {
    console.log(error);
    return next(error)
 }   
};
module.exports = {upload}