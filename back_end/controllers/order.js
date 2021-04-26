import e from 'express';
import formidable from 'formidable';
import  Order from '../models/order'
export const  addorder = (req, res)=>{
    let order = new Order(req.body)
    order.save((err, data) => {
        if(err){
            return res.status(400).json({
                err : "Thất bại !"
            })
        }
        res.json({
            data ,message: "thành công "
        })
    })
        // let form = formidable.IncomingForm();
        // form.keepExtensions = true;
        // form.parse(req , (err,fildes,files)=>{
        //     if(err){
        //         res.status(400).json({
        //             err : " Thêm thất bại !"
        //         })
        //     }
        //     const {productId,userId,address,nameKh,phone} = fildes
        //     if(!nameKh || !phone  || !address || !productId || !userId){
        //         return res.status(400).json({
        //             err: " Cần Nhập đầy đủ các trường "
        //         })
        //     }
        //     let order = new Order(req.body)
        //     order.save((err, data) => {
        //         if(err){
        //             return res.status(400).json({
        //                 err : "Thất bại !"
        //             })
        //         }
        //         res.json(data)
        //     })
        // })
}
export const list = (req, res)=>{
        Order.find((err,data) => {
            if(err){
                return res.status(400).json({
                    err: "Lỗi !"
                })
            }
            res.json(data)
        })
}
export const  orderId = (req,res, next, id)=>{
        Order.findById(id).exec((err, data) => {
            if(err){
                return res.status(400).json({
                    err:  " Không Có Order "
                })
            }
            req.order = data
            next();
        })
}
export const  remove = (req, res)=>{
        let order = req.order
        order.remove((err,data) => {
            if(err){
                return res.status(400).json({
                    err: " Xóa thất bại ! "
                })
            }
            res.json({
                data,
                message: " Xóa thành công "
            })
        })
}
export const update = (req, res)=>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req , (err,fildes,files)=>{
        if(err){
            res.status(400).json({
                err : " Thêm thất bại !"
            })
        }
        const {productId,userId,address,nameKh,phone,totalmoney} = fildes
        if(!nameKh || !phone || !totalmoney || !address || !productId || !userId){
            return res.status(400).json({
                err: " Cần Nhập đầy đủ các trường "
            })
        }
        let order = req.order
        order.save((err, data) => {
            if(err){
                return res.status(400).json({
                    err : "Thất bại !"
                })
            }
            res.json(data)
        })
    }) 
}
export const  orderdetails = (req, res)=>{
    return res.json(req.order)
}