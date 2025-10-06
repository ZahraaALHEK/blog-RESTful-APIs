const  jwt = require("jsonwebtoken");
const {secret_value} = require("./../config/Keys")
const generateToken = (user)=>{
    const token = jwt.sign({
        _id : user._id,
        name : user.name ,
        email : user.email ,
        role : user.role
    },
    secret_value,
    {expiresIn:"7d"})
    return token ;
}
module.exports = generateToken;