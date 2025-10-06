const express = require("express");
const router = express.Router();
const {signupValidator,signinValidator,emailValidator,verifyUserValidator,recoverPasswordValidator,changePasswordValidator,updateProfileValidator} = require("./../validators/authValidator")
const validator = require("./../validators/validator")
const isAuth = require("./../middlewares/isAuth")
const {authControllers} = require("./../controllers")
router.post("/signup",signupValidator, validator , authControllers.signup)
router.post("/signin",signinValidator,validator,authControllers.signin)
router.post("/send-verification-email",emailValidator,validator,authControllers.verifyCode);
router.post("/verify-user",verifyUserValidator,validator,authControllers.verifyUser);
router.post("/forget-password-code",emailValidator,validator,authControllers.forgetPasswordCode);
router.post("/recover-password",recoverPasswordValidator,validator,authControllers.recoverPassword);
router.put("/change-password",changePasswordValidator,validator,isAuth,authControllers.changePassword);
router.put("/update-profile",updateProfileValidator,validator,isAuth,authControllers.updateProfile);
module.exports = router;