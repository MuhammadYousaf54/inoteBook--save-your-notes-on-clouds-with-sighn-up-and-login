const mongoose = require('mongoose');
const mongooseUrl  ="mongodb://127.0.0.1:27017/";

const connectToMongo = ()=>{
    mongoose.connect(mongooseUrl,()=>{
  console.log("connected to mongoose sucessfully");
  
  });
  
   
}
module.exports = connectToMongo;