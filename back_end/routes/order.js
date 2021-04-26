import express from 'express';
const router = express.Router();
import {addorder,list,update, remove, orderdetails, orderId} from  '../controllers/order'
// import{}
 router.post('/order' , addorder)
 router.get('/order' , list)
 router.put('/order/:orderId' , update)
 router.delete('/order/:orderId' , remove)
 router.get('/order/:orderId' , orderdetails)
 router.param("orderId" , orderId)
 module.exports = router