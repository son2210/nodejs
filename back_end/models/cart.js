import mongoose from 'mongoose';
const {ObjectId} =  mongoose.Schema;
let cartSchema =  new  mongoose.Schema({ // khi 
    iduser:{
        type: ObjectId,
        ref: 'user', 
        required: true
    },
    idProduct:{
        type: ObjectId,
        ref : 'Product', 
        required:true
    },
    quantity: {
        type: Number,
        default : 0
    }

},{timestamps : true})
 module.exports = mongoose.model("Cart", cartSchema)