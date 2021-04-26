import User from '../models/admin'
import _ from 'lodash';
export const listUser = (req, res) => {
    User.find((err, data) => {
        if (err) {
            return res.status(400).json({
                err: " Không có tài khoản nào !"
            })
        }
        res.json(data)
    })
}

export const userId = (req, res, next, id) => {
    User.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                err: " Không có tài khoản nào "
            })
        }
        req.profile = data
        next();
    })
}
export const userDetails = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}
export const remove = (req, res) => {
    const user = req.profile
    user.remove((err, deleteUser) => {
        if (err) {
            return res.status(400).json({
                err: " Xóa thất bại !"
            })
        }
        res.json({
            deleteUser,
            message: " Xóa thành công"
        })
    })
}
export const updateUser = (req, res) => {
    console.log(     req.profile        );
    User.findOneAndUpdate(
        { _id: req.profile.id },
        { $set: req.body },
        { new: true },
        (err, admin) => {

            if (err) {
                return res.status(400).json({
                    err: " Cập nhất thất bại !"
                })
            }
            req.profile.hashed_password = undefined;
            req.profile.salt = undefined;
            res.json(admin)
        })
}
