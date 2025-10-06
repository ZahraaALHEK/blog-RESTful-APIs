const jwt = require("jsonwebtoken");
const {secret_value} = require("./../config/Keys")
const isAuth = async (req,res,next)=>{
    try {
        const authorization = req.headers.authorization
        ? req.headers.authorization.split(" ")
        : [];
        const token = authorization.length > 1 ? authorization[1] : null ;
        if(token){
            const payload = jwt.verify(token,secret_value);
            if (payload) {
                req.user = {
                    _id : payload._id ,
                    name : payload.name,
                    email : payload.email,
                    role : payload.role
                };
                next()
            }else{
                const error = new Error("unauthrized user");
                error.statusCode = 401;
                next(error)
            }
        }else{
            const error = new Error("token is required");
            error.statusCode = 400;
            next(error)
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}
module.exports = isAuth;