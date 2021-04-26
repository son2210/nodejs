import express from 'express';
const router = express.Router();
import { addStore, lisStore, update, remove, storeDetails, storeId ,photo} from '../controllers/store'
// import{}
router.post('/store', addStore)
router.get('/store', lisStore)
router.put('/store/:storeId', update)
router.delete('/store/:storeId', remove)
router.get('/store/:storeId', storeDetails)
router.get('/stores/readphoto/:storeId',photo)
router.param("storeId", storeId)
module.exports = router
