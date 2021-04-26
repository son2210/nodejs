import  Cart from '../models/cart'
import formidable from 'formidable'
import  _ from 'lodash'
export const  add = (req, res) =>{
     const {iduser , idProduct} =req.body;
     if(!idProduct ||  !iduser){
         return res.status(400).json({
             err : " Không được để Trống"
         })
     }
        let  carts = new  Cart(req.body)
        carts.save((err, data)=>{
            if(err  || !data){
                res.status(400).json({
                    err: " Thêm giỏ hàng thất bại !"
                })
            }else{
                res.json({
                    data,
                    message:  "Đặt Hàng Thành Công"
                })
            }
        })
}
export const  list = (req, res ) =>{
    Cart.find((err, data)=>{
        if(err  || !data){
            res.status(400).json({
                err: " Không có sản phẩm"
            })
        }
            res.json(data)
    })
}
export const idCart = (req, res , next, id) =>{
    Cart.findById(id).exec((err, data) =>{
        if(err || !data ){
            return res.status(404).json({
                err : " Không tìm thấy cart"
            })
        }
        req.cart = data
        next();
    })
}
export const remove = (req, res) =>{
        let cart = req.cart
        cart.remove((err,data)=>{
            if(err){
                return res.status(400).json({
                    err: "Không xóa được Cart"
                })
            }
            res.json({
                data , 
                message: " Xóa thành công "
            })
        })
}
export const cartDetails  = (req, res) =>{
    return res.json(req.cart)
}
export const  updateCart = (req, res) =>{
    const {iduser , idProduct} = req.body;
    if(!idProduct ||  !iduser){
        return res.status(400).json({
            err : " Không được để Trống"
        })
    }
    let cart = req.cart
    cart = _.assignIn(cart,req.body)
    cart.save((err,data) =>{
        if(err){
            return res.status(400).json({
                err : " Sửa Thất bại !"
            })
        }
        res.json({
            data , message : " cập nhật thành công"
        })
    })

}