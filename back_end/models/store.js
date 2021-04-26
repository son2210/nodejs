import mongoose from 'mongoose';
const  store = mongoose.Schema({
        name:{
            type: String,
            trim: true,
            require: true,
        },
        address : {
            type: String,
            required: true,
            trim: true,
        },
        phone : {
            type:Number,
            required :true
        },
        description:{
            type :String,
            trim:true,
            required: true
        },
        photo: {
            data: Buffer,
            contentType: String
        }
},{timestamps : true})

module.exports = mongoose.model('store' , store)