import Feedback from '../models/phanhoi'
import formidable from 'formidable'

export const addfeedback = (req, res) => {
   
                const { name, email, contentfeeback } = req.body
                if (!email || !name || !contentfeeback) {
                        return res.status(400).json({
                                err: " Bạn Chưa Nhập Đầy Đủ Các Trường !"
                        })
                }
                const feedback = new Feedback(req.body)
                feedback.save((err, data) => {
                        if (err) {
                                return res.status(400).json({
                                        err: "Thêm Phản Hồi Thất Bại 22 !"
                                })
                        }
                        res.json({
                                data,
                                message: " Thêm Phản Hồi Thành Công"
                        })
                })
   
}

export const lisFeedback = (req, res) => {
        Feedback.find((err, data) => {
                if (err) {
                        return res.status(400).json({
                                err: " không có  phản hồi "
                        })
                }
                res.json(data)
        })
}
export const feedbackId = (req, res, next, id) => {
        Feedback.findById(id).exec((err, feedback) => {
                if (err) {
                        return res.status(400).json({
                                err: " Không Có phản hồi nào "
                        })
                }
                req.feedback = feedback
                next();
        })
}
export const feedbackDetails = (req, res) => {
        return res.json(req.feedback)
}
export const remove = (req, res) => {
        const feedback = req.feedback
        feedback.remove((err, deleteFeedback) => {
                if (err) {
                        return res.status(400).json({
                                err: " Xóa phản hồi thất bại !"
                        })
                }
                res.json({
                        deleteFeedback,
                        message: " Xóa Thành Công"
                })
        })
}
export const updateFeedback = (req, res) => {
        let form = formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fildes, files) => {
                if (err) {
                        return res.status(400).json({
                                err: " Cập Nhật Thất Bại "
                        })
                }
                const { name, email, contentfeeback } = fildes;
                if (!name || !email || !contentfeeback) {
                        return res.status(400).json({
                                err: " Không được Để Trống "
                        })
                }
                let feedback = req.feedback
                feedback.save((err, data)=>{
                        if(err) {
                                return res.status(400).json({
                                        err: "Cập Nhật Thất Bại "
                                })
                        }
                        res.json({
                                data,
                                message:" Cập nhật thành công"
                        })
                })
                console.log(feedback);
        })
}