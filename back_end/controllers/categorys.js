import Category from '../models/Category';
import fs from 'fs';
import formidable from 'formidable'; // thư viện iinput iamge
import _ from "lodash"
//  adđ category
export const addCategory = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({
            err: " Thêm Danh Mục Thất Bại "
        })
    }
    let category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({ err: "Thêm Danh Mục Thất Bại" })
        }
        res.json(data)
    })

    // });
}

export const list = (req, res) => {
    let page = req.query.page //  số page 
    let soluong = req.query.limit // số lượng ở ngoài 
    page = parseInt(page)
    soluong = parseInt(soluong)
    if (page) {
            const pagethu = (page - 1) * soluong
            Category.find({}).skip(pagethu).limit(soluong).exec((err, data) => {
                if (err || !data) {
                    return res.status(400).json({
                        err: "Không có sản phẩm "
                    })
                } else {
                    res.json({data})
                }
            })
    } else {
        Category.find((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Không Tìm Thấy Danh Mục"
                })
            }
            res.json(data)
        })
    }

}
//  lấy id của danh mục 
export const categorId = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                err: "Không  tìm  danh mục nào"
            })
        }
        req.category = category
        next();
    })
}
export const categorydetails = (req, res) => {
    return res.json(req.category)
}
export const remove = (req, res) => {
    let category = req.category
    category.remove((err, deletCategory) => {
        if (err) {
            return res.status(400).json({
                message: ' Xóa Thư Mục Thất Bại'
            })
        }
        res.json({
            deletCategory,
            message: ' Xóa Thư Mục Thành công'
        })
    })
}
export const updateCategory = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({
            err: " Sửa Danh Mục Thất Bại "
        })
    }
    let category = req.category;
    category = _.assignIn(category, req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({ err: "Sửa Danh Mục Thất Bại" })
        }
        res.json(data)
    })

    // })
}
