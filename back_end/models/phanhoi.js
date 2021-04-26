import  mongoose from 'mongoose';
const feedbackSchema = new mongoose.Schema({
    name:{
        type :String,
        trim: true,
        required : true,
    },
    email:{
        type :String,
        trim: true,
        required : true,
    },
    contentfeeback:{
        type :String,
        trim: true,
        required : true,
    }
},  
{timestamps : true,})
module.exports = mongoose.model('Feedback',feedbackSchema)