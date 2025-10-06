const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String 
    },
    updateBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, { timestamps: true });
const Category =  mongoose.model("category",CategorySchema)
module.exports = Category;