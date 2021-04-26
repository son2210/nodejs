import mongoose from 'mongoose';
const { ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
    },
    age: {
        type: String,
        require : true,
    },
    quantity: {
        type: Number
    },
    gioitinh: {
        required: true,
        type: Boolean
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    categoryId:{
        type: ObjectId,
        ref :"Category",
        required:false,
    },
    specieId:{
        type : ObjectId,
        ref : "species",
        required: false
    }
},
    { timestamps: true, })
module.exports = mongoose.model('Product', productSchema)