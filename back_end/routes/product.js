import express from 'express';
import  {listProduct, addProduct,productId,read ,remove, photo, update} from "../controllers/product"
import {isAuth,isAdmin ,requireSignin}  from '../controllers/auth'
import {userId} from '../controllers/admin'
const router = express.Router();

router.get('/products',listProduct)

router.post('/products/:userId',requireSignin, isAuth, isAdmin ,addProduct)   // thêm anh 

router.get('/products/:productId',read) // chi tiêt sản phẩm 
router.get('/products/readPhoto/:productId', photo)
router.delete('/products/:userId/:productId' ,requireSignin, isAuth, isAdmin, remove) // xóa sản phẩm 
router.put('/products/:userId/:productId' ,requireSignin, isAuth, isAdmin ,update) // sửa ảnh 

router.param('productId', productId)
router.param('userId', userId)
module.exports = router 