import express from 'express';
const router = express.Router();
import {addComent,list,commnetId,remove,update,commentDetails} from '../controllers/comment'
router.post('/coment', addComent)
router.get('/coment' , list)
router.get('/coment/:comentId', commentDetails)
router.delete('/coment/:comentId', remove)
router.put('/coment/:comentId')
router.param ('comentId' , commnetId)
 module.exports = router