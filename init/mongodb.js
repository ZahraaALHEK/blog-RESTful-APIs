const mongoose = require("mongoose")
const {dbString}  = require("./../config/Keys")
// const {}  = require("./../config/Keys")
const connectionMongoDb = async ()=>{
    try {
      await  mongoose.connect(dbString);
      console.log("connect mongo db");
      
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = connectionMongoDb;