require("dotenv").config()
module.exports = {port : process.env.port||3000 
    , dbString : process.env.MONGO_URI,
    secret_value : process.env.secret_value,
    Email : process.env.email,
    password_email : process.env.pss_email,
    awsAccessKey : process.env.aws_access_key,
    awsSecretAccessKey : process.env.aws_secret_access_key,
    awsBucketName : process.env.aws_bucket_name,
    awsRegion : process.env.aws_Region
}