import mongoose from 'mongoose';
const {ObjectId} =  mongoose.Schema;
const categorySchema = new  mongoose.Schema({
    name:{
        type: String,
        trim :true,
        required: true,
    },
    speciesId:{
        type : ObjectId,
        ref: "speices",
        required: false,
    }
},
    { timestamps:true})
    module.exports =mongoose.model("Category",categorySchema )