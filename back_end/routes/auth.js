import  express from 'express';
const router = express.Router();
import { signup,signin, signout,userId }  from '../controllers/auth'
import {userSignupValidator}  from '../validator/index'

router.post('/signup',userSignupValidator,signup);
router.post('/signin', signin); // dnagw nhập 
router.get('/signout' , signout);

module.exports = router