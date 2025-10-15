const {User} = require("./../models");
const hashPassword = require("./../utils/hashPassword");
const comparePassword = require("./../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");


const signup = async (req ,res,next) =>{
    try {
        const {name,email,password,role} = req.body ;
        const existEmail = await User.findOne({email});
        if (existEmail) {
            const err = new Error("this email is already exist")
            err.statusCode = 400 ;
            return next(err)
        }
        const hashedPassword = await hashPassword(password);
        const newUser =  new User({name,email,password : hashedPassword ,role});
        await newUser.save();
        res.status(201).json({message:"User registred successfully"})
    } catch (error) {
        console.log(error);
       next(error);
    }
}
const signin = async (req,res,next) =>{
    try {
        
   
    const {email,password} = req.body ;
    const existUSer = await User.findOne({email});
    if (!existUSer) {
        const err = new Error("user not found")
        err.statusCode=400
        return next(err)
    }
    const match = await comparePassword(password, existUSer.password)
    if(!match){
        const err = new Error("Invalid credentials");
        err.statusCode = 400
        return next(err)
    }
    const token = generateToken(existUSer)
    res.status(200).json({
        code : 200 ,
        status : true ,
        message : "user "+existUSer.name +" loggin successfully",
        data: token
    })
     } catch (error) {
        console.log(error);
        next(error)
    }

}
const verifyCode = async (req,res,next) =>{
    try {
        const {email} = req.body;
        if(!email){
            const error = new Error("email is required");
            error.statusCode = 400;
            return next(error);
        }
        const user = await User.findOne({email});
        if(!user){
            const error = new Error("user not found")
            error.statusCode = 404;
            return next(error)
        }
        if(user.isVerified){
            const err = new Error("that email is already verified");
            err.statusCode = 400
            return next(err)
        }
        const code = generateCode(6);
        // send email 
       await sendEmail({emailTo :user.email,
        subject :"Email verification code",
        code ,
        content : "verify your account"
       });
        user.verifyCode = code;
        user.save();
        
        res.status(200).json({
            code: 200,
            status : true,
            message: "user verification code sent successfully",
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}
const verifyUser = async (req,res,next) => {
    try {
        const {email,code} = req.body
        const user = await User.findOne({email});
        if (!user) {
            const err = new Error("user not found");
            err.statusCode =404;
            return next(err) ;
        }
        if(user.verifyCode !== code){
            const err = new Error("invalide code");
            err.statusCode =400;
            return next(err);
        }
        user.isVerified = true;
        user.verifyCode = null;
        await user.save();
        res.status(200).json(
            {
                code:200,
                status:true,
                message:"user is verified"
            }
        )

    } catch (error) {
        console.log(error);
        next(error)
    }
}
const forgetPasswordCode = async(req,res,next) => {
    try {
       const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        const err = new Error("user not found");
        err.statusCode =404;
        return next(err) ;
    }
    //grnerate code 
    const code = generateCode(6);
    user.forgetPasswordCode = code ;
    await user.save();
    await sendEmail({
        emailTo:user.email,
        subject: " forget password code",
        code,
        content:"change your password"
    });
    res.status(200).json({code:200,status : true , message :"code send successfully"}); 
    } catch (error) {
        console.log(error);
        next(error)
    }
    
}
const recoverPassword = async (req,res,next) => {
    try {
        const {email,code,password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            const err = new Error("user not found");
            err.statusCode =404;
            return next(err) ;
        }
        if(user.forgetPasswordCode !== code){
            const err = new Error("invalide code");
            err.statusCode =400;
            return next(err);
        }
        const hashedPassword = hashPassword(password);
        user.password = hashPassword;
        user.forgetPasswordCode = null;
        user.save();
        res.status(200).json(
            {
                code:200,
                status:true,
                message:"password changed successfully"
            }
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const changePassword = async(req,res,next) => {
    try {
        const _id = req.user._id ;
        const {oldPassword,newPassword} = req.body;
        const user = await User.findById(_id);
        if(!user){
            const error = new Error("user not found");
            error.statusCode = 401;
            next(error);
        }
        const match = await comparePassword(oldPassword,user.password);
        if(!match){
            const err = new Error("Invalid password");
            err.statusCode = 400
            return next(err)
        }
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({code:200,status:true,message: "password is cahanged successfully"})
    } catch (error) {
        console.log(error);
        next(error)
    }
}
const updateProfile = async (req,res,next) => {
   try {
        const _id = req.user._id ;
        const {email,name , profilePic } = req.body;
        const user = await User.findById(_id);
        if(!user){
            const error = new Error("user not found");
            error.statusCode = 401;
            next(error);
        }
        if (profilePic) {
        const file = await File.findById(profilePic);
        if (!file) {
           res.code = 404;
           throw new Error("File not found");
        }
    }
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.profilePic = profilePic;
        if(email){
            user.isVerified = false;
        }
        await user.save();
        res.status(200).json({code:200,status:true,message: "profile updatred successfully"})
   } catch (error) {
    console.log(error);
    next(error);
   } 
}
module.exports = {signup,signin,verifyCode,verifyUser,forgetPasswordCode,recoverPassword,changePassword,updateProfile}