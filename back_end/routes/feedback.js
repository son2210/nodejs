import  express from 'express';
const  router = express.Router();
import {addfeedback,lisFeedback,feedbackId,feedbackDetails,remove,updateFeedback} from '../controllers/feedback';

 router.post('/feedback',addfeedback)

 router.get('/feedback',lisFeedback)

 router.get('/feedback/:feedbackId', feedbackDetails)

router.delete('/feedback/:feedbackId', remove)

router.put('/feedback/:feedbackId', updateFeedback)
 router.param('feedbackId', feedbackId)
 module.exports = router