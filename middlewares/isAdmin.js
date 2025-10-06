const isAdmin = async (req,res,next) =>{
    try {
       

        if (req.user &&(req.user.role== 2 || req.user.role ==1 )) {
            next()
        }
        else{
            const err = new Error("permission denied");
            err.statusCode = 401 ;
            next(err);
            
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = isAdmin;