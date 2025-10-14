const mongoose = require("mongoose");
const fileSchema = mongoose.Schema({
    key : {
        type : String ,
        required : true
    } ,
    size : Number ,
    mimetype : String ,
    createBy : {
        type : mongoose.Types.ObjectId ,
        ref : user
    }
} , 
{
    timestamps : true
});
const File = mongoose.model("file",fileSchema);
module.exports = User ;
