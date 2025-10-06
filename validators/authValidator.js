const {check} = require("express-validator");
const validateEmail = require("./validateEmail");
const signupValidator = [
    check("name").notEmpty().withMessage("name is required") ,
    check("email").isEmail().withMessage("invalide Email").notEmpty().withMessage("email is required"),
    check("password").isLength({min:6}).withMessage("the password should be long then 5 char")
    .notEmpty().withMessage("password is required")
];
const signinValidator = [
    check("email").isEmail().withMessage("invalide Email").notEmpty().withMessage("email is required"),
    check("password").isLength({min:6}).withMessage("the password should be long then 5 char")
    .notEmpty().withMessage("password is required")
];
const emailValidator = [
    check("email").isEmail().withMessage("invalide Email").notEmpty().withMessage("email is required")
];
const verifyUserValidator = [
    check("email").isEmail().withMessage("invalide Email").notEmpty().withMessage("email is required"),
    check("code").notEmpty().withMessage("code is required")
];
const recoverPasswordValidator = [
    check("email").isEmail().withMessage("invalide Email").notEmpty().withMessage("email is required"),
    check("code").notEmpty().withMessage("code is required"),
    check("password").isLength({min:6}).withMessage("the password should be long then 5 char")
    .notEmpty().withMessage("password is required")
];
const changePasswordValidator = [
    check("oldPassword").isLength({min:6}).withMessage("the password should be long then 5 char")
    .notEmpty().withMessage("the old password is required"),
    check("newPassword").isLength({min:6}).withMessage("the password should be long then 5 char")
    .notEmpty().withMessage("the new password is required")
];
const updateProfileValidator = [
  check("email").custom((email) => {
    if (!email) return true;
    const isValid = validateEmail(email);
    if (!isValid) {
      throw new Error("Invalid email format"); 
    }
    return true;
  })
];
module.exports = {
                    signupValidator,
                    signinValidator,
                    emailValidator,
                    verifyUserValidator,
                    recoverPasswordValidator,
                    changePasswordValidator,
                    updateProfileValidator
                };