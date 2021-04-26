import express from 'express';
const  router = express.Router();
 import {addSlide,listSlide,SlideId,slideDetails,remove,update,readPhoto } from '../controllers/slideShow'
 import {isAuth,isAdmin ,requireSignin} from '../controllers/auth'
import {userId}  from '../controllers/admin'
router.post('/slides/:userId' ,requireSignin, isAuth, isAdmin ,addSlide) // thêm slide 
router.get('/slides' , listSlide) //  lấy ra tất cả
router.get('/slides/:slideId', slideDetails); // ;ấy ra chi tiêt slider
router.get('/slides/readPhoto/:slideId',readPhoto) // link ảnh 
router.delete('/slides/:userId/:slideId', requireSignin, isAuth, isAdmin,remove) // xóa slider
router.put('/slides/:userId/:slideId' , requireSignin, isAuth, isAdmin, update) // cập nhật 
router.param('slideId' , SlideId)
router.param("userId", userId)
 module.exports = router
 