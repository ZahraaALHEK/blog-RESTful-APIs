require("dotenv").config()
module.exports = {port : process.env.port||3000 
    , dbString : process.env.MONGO_URI,
    secret_value : process.env.secret_value,
    Email : process.env.email,
    password_email : process.env.pss_email,
    uploadcareKey: process.env.uploadcare_public_key ,
    uploadcareSecretKey : process.env.uploadcare_secret_key
}