import Product from '../models/product'
import fs from 'fs';
import formidable from 'formidable'
import _ from 'lodash'
export const listProduct = (req, res) => {
  let page = req.query.page
  let soluong = req.query.limit
  page = parseInt(page)
  soluong = parseInt(soluong)
    if (page) {
        let ofset = (page - 1) * soluong
        Product.find({}).skip(ofset).limit(soluong).exec((err, data) =>{
            if(err || !data){
                return res.status(400).json({
                    err: "Không tìm thấy sản phẩm "
                })
            }else{
                res.json(data)
            }
        })
    } else {
        Product.find((err, data) => {
            if (err) {
                return res.status(404).json({
                    err: " Không tìm thấy sản phẩm "
                })
            }
            res.json(data)
        })
    }

}
export const addProduct = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        if (err) {
            return res.status(400).json({
                err: " Thêm sản phẩm k thành công "
            })
        }
        const { name, description, price } = fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                err: " Cần Nhập Đầy Đủ  Các Trường"
            })
        }
        let product = new Product(fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    err: " Hình ảnh đã quá 1M"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Thêm Sản Phẩm Thất Bại "
                })
            }
            res.json(data)
        })
    });

}
export const productId = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(404).json({
                err: " Không tìm thấy sản phẩm "
            })
        }
        req.product = product;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.product)
}
export const remove = (req, res) => {
    let product = req.product
    product.remove((err, deleteproduct) => {
        if (err) {
            res.status(400).json({
                err: " Xóa Sản Phẩm Thất Bại "
            })
        }
        res.json(
            {
                deleteproduct,
                message: " Xóa Sản Phẩm Thành Công "
            })
    })
}
export const update = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fildes, files) => {
        if (err) {
            res.status(400).json({
                err: "  Thất Bại !"
            })
        }
        const { name, description, price } = fildes
        if (!name || !description || !price) {
            res.status(400).json({
                err: "Không được để trống "
            })
        }
        let product = req.product
        product = _.assignIn(product, fildes)
        
         if(files.photo){
             if (files.photo.size > 1000000) {
                return res.status(400).json({
                    err: " Hình ảnh đã quá 1MB"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
         }
            product.save((err, data) => {
               
            if (err) {
                console.log(err.message);
                    return res.status(400).json({
                    err: "Cập  nhật thất bại !"
                })
            }
            res.json({
                data,
                message: " cập nhật thành công "
            })
        })
    })
}
export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}