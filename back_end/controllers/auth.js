const  jwt  = require('jsonwebtoken') ;
import  User  from '../models/admin' ;
const expressJwt = require('express-jwt');
import dotenv from 'dotenv';
dotenv.config();
exports.signup = (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                err: "Email đã được đăng ký . vui lòng đăng ký lại !"
            })
        }
        res.json( user)
    })
}
exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'Email Hoặc mật khẩu không đúng !'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                err: 'Mật Khẩu Không Đúng'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('user', token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user;
        return res.json(

            {
                token, user: { _id, email, name, role }
            }
        )
        
    })
};
exports.signout = (req, res) => {
    res.clearCookie('user');
    res.json({
        message: 'Signout Success'
    })
}
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
});
exports.isAuth = (req, res, next) => {
    let abc = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!abc) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Không phải quản trị"
        })
    }
    next();
}
// export const userId =(req, res,id, next) => {
//     User.findById(id).exec((err, data) =>{
//         if(err){
//             return res.status(400).json({
//                 err: " Không tìm thấy tài khoản "
//             })
//         }
//         req.user = data
//         next();
//     })
// }