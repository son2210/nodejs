import mongoose from 'mongoose';
import  crypto  from 'crypto';
const { v1: uuidv1 } = require('uuid');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        trim: true,
    },
    about: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        trim: true,
        default: 0
    },
    salt: {
        type: String,
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true })

userSchema.virtual('password')
    .set(function(password) {
         this.salt = uuidv1()
         this.hashed_password = this.encryptedPassword(password)
    })
userSchema.methods = {
     authenticate: function(plainText) {
        return this.encryptedPassword(plainText) === this.hashed_password
     },
     encryptedPassword : function(password) {
         if(!password)  return "";
         try {
             return  crypto 
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
         }catch(error) {
             return '0';
         }
     }
}
module.exports = mongoose.model('user', userSchema)