import express from 'express';
const router = express.Router();
import  {userId}  from '../controllers/admin'
import {listUser,updateUser,remove,userDetails} from '../controllers/admin';
import  {requireSignin, isAuth,isAdmin} from '../controllers/auth'
// requireSignin

router.get('/secret/:userId', (req, res) => {
    res.json({
        user: req.profile
    })
});
router.get('/users/:userId',requireSignin,isAuth,isAdmin,listUser) // list user id tài khoản 
router.put('/user/:userId' , updateUser) // cập nhật 
router.delete('/user/:userId', remove) // xóa
// router.delete('/user/:userId', isAuth,remove) // xóa
router.get('/user/:userId' , userDetails) /// chi tiêt 
// router.get('/user/:userId' ,isAuth, userDetails) /// chi tiêt 
router.get("/userComent" , listUser)

router.param('userId' , userId); 

module.exports = router