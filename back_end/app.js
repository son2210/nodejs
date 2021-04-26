import express from 'express'
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import  productRoutes from './routes/product.js'; // sản phẩm 
import  categoryRoutes from './routes/category.js' // list category routes
import feedbackRouter from './routes/feedback.js'; // phản hồi 
import  SlideRouter from './routes/slideShow' // slider banner
import  userRouter from './routes/Admin.js' /// tài khoản
import speciesRouter from './routes/species.js' // danh mục cha 
import  storeRouter from './routes/store' // cửa hàng
import  orderRouter from './routes/order'  // order
import comment from './routes/comment' // bình luận 
import autRouter from './routes/auth'
import  routerCart  from './routes/cart'
import expressValidator from 'express-validator'
const app = express();
dotenv.config();
// middlweare
app.use(express.json())
app.use(morgan('dev'));
app.use(cors( { credentials: 'same-origin' }))
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
const port = process.env.PORT || 8000

app.use('/api',productRoutes); // sản phẩm 
app.use('/api',categoryRoutes); // danh mục 
app.use('/api',feedbackRouter); // phản hồi 
app.use('/api',SlideRouter); // Slider
app.use('/api',userRouter); // tài khoản
app.use('/api',autRouter); // tài khoản
app.use('/api',speciesRouter); // spearis
app.use('/api',storeRouter); // cửa hàng 
app.use('/api',orderRouter); //order 
app.use('/api',comment); //order 
app.use('/api',routerCart); // giỏ hàng  


// connection 
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser : false,
    useCreateIndex : true
}).then (() =>{
    console.log("Nguyễn Hữu Sơn");
})
mongoose.connection.on('error',error =>{
    console.log(error);
})  
app.listen(port,() =>{
    console.log(`server is running on port: ${port}`);
 })
