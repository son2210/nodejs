import fs from 'fs';
import formidable from 'formidable'
import Slide from '../models/sildeShow'
import _ from 'lodash'
export const addSlide = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fildes, files) => {
        console.log(fildes);
        if (err) {
            return res.status(400).json({
                err: " Thêm banner Thất Bại !"
            })
        }
        const { name } = fildes
        if (!name) {
            return res.status(400).json({
                err: " Cân nhập đây đủ các trường !"
            })
        }
        let slide = new Slide(fildes);

        // if(files.photo.size > 10000){
        //     return res.status(400).json({
        //         err :  "Hình ảnh Không quá 1MB"
        //     })
        // }
        // console.log(files.photo);
        slide.photo.data = fs.readFileSync(files.photo.path);
        slide.photo.contentType = files.photo.type;
        slide.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: " Thêm thất bại !"
                })
            }
            res.json(data)
        });

    })
}
export const listSlide = (req, res) => {
    Slide.find((err, data) => {
        if (err) {
            return res.status(400).json({
                err: " Không tìm thấy slide "
            })
        }
        res.json(data)
    })
}
export const SlideId = (req, res, next, id) => {
    Slide.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Không có Slide nào"
            })
        }
        req.slide = data
        next();
    })
}
export const slideDetails = (req, res) => {
    return res.json(req.slide)
}
export const remove = (req, res) => {
    let slide = req.slide
    slide.remove((err, data) => {
        if (err) {
            res.status(400).json({
                err: "Xóa thất bại !"
            })
        }
        res.json({
            data,
            message: "Xóa thành công !"
        })
    })
}
export const update = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fildes, files) => {
        if (err) {
            return res.status(400).json({
                err: "Thất bại !"
            })
        }
        const { name } = fildes
        if (!name) {
            return res.status(400).json({
                err: " cần nhập đây đủ các trường !"
            })
        }
        let slide = req.slide
        slide = _.assignIn(slide, fildes)
        if(files.photo){
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    err: "Hình ảnh Không quá 1MB"
                })
            }
            slide.photo.data = fs.readFileSync(files.photo.path);
            slide.photo.contenType = files.photo.path
        }
        
       
        slide.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: " Cập nhật thất bại !"
                })
            }
            res.json({
                data,
                message: "Cập nhật thành công !"
            })
        });

    })
}

export const readPhoto = (req, res) => {
    if (req.slide.photo.data) {
        res.set("Content-Type", req.slide.photo.contentType);
        return res.send(req.slide.photo.data)
    }

}