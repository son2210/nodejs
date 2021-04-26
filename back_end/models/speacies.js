import mongoose from 'mongoose';
const speacieShema = new mongoose.Schema({
    name:{
        type: String,
        require : true,
        trim: true,
    }
},{timestamps : true})
module.exports = mongoose.model('species' , speacieShema)