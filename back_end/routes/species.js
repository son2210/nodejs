import express from 'express';
const router = express.Router();
import {addSpecies,listSpecies,speciesId,speciesDetails,remove,updateSpecies} from '../controllers/speacies'
import  {isAuth,isAdmin,requireSignin} from '../controllers/auth'
import {userId} from  '../controllers/admin'
router.post('/species' , requireSignin, isAuth, isAdmin ,addSpecies)  // thêm species
router.get('/species', listSpecies)
router.delete('/species/:userId/:speciesId',requireSignin, isAuth, isAdmin,  remove) // xóa 
router.put("/species/:userId/:speciesId", requireSignin, isAuth, isAdmin, updateSpecies ) // cập nhật 
router.get('/species/:speciesId',speciesDetails )
router.param('speciesId', speciesId)
router.param('userId' , userId)
module.exports =  router