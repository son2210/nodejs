import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const comentSchema =  mongoose.Schema({
    contenComment :{
        type: String,
        trim: true,
        equired: true
    },
    adminId: {
        type: ObjectId,
        ref : "user",
        required: true,
        trim :true
    },
    productId : {
        type:ObjectId,
        ref : "Product",
        required: true,
        trim: true
    }
},{timestamps : true})
module.exports = mongoose.model('comment' , comentSchema)