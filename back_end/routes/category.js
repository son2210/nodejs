import express from 'express';
import {addCategory ,list,categorId,categorydetails, remove,updateCategory} from '../controllers/categorys'; // gọi hàm 
import {isAdmin , isAuth ,requireSignin } from '../controllers/auth'
import {userId} from '../controllers/admin'
const router = express.Router();

router.post('/categorys/:userId',requireSignin,isAuth, isAdmin,addCategory) // thêm vào
router.get('/categorys' , list )
router.get('/categorys/:categoriesId' , categorydetails) // chi tiêt danh mục 

router.put('/categorys/:userId/:categoriesId', requireSignin,isAuth, isAdmin, updateCategory)  // cập nhật danh mục 
router.delete('/categorys/:userId/:categoriesId' ,requireSignin,isAuth, isAdmin, remove) // xóa danh mục 
router.param('categoriesId' , categorId)  // id categori 
router.param("userId" , userId)

module.exports = router