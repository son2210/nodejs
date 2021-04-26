import mongoose from "mongoose"
const slideShowSchemca = new mongoose.Schema({
    name:{
        type : String,
        trim : true,
        require: true
    },
    photo:{
        data : Buffer,
        contentType : String,
       
    }
} , {timestamps : true})
module.exports = mongoose.model('Slide' , slideShowSchemca)