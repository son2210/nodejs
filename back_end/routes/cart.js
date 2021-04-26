import  express from 'express';
const router =express.Router();
import  {add,list , remove, updateCart , cartDetails, idCart}  from '../controllers/cart '
router.post('/cart' , add) // thêm vào giỏ hàng 
router.get('/cart' , list) // lấy tất cả 
router.delete('/cart/:cartId' , remove) // lấy tất cả 
router.put('/cart/:cartId' , updateCart) // lấy tất cả 
router.param("cartId" , idCart)
module.exports = router 