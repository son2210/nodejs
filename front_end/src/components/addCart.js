import ProductApi from '../api/productApi.js'
import {$, comBack} from '../pages/untils.js'
const addCart ={
   async  addtoCart(productId){
    //    console.log(productId);
        let cart = localStorage.getItem('cart'); //đ
        // ép kiểu string sang jsonN
        cart = cart == null ? [] : JSON.parse(cart); //d 
        const {data:product}= await ProductApi.get(productId)  
       
        let existed = cart.map(o => o._id).indexOf(product._id);    
        if(existed == -1){               
            product.quantity = 1;  
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));         
        }else{
            cart[existed].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
       await this.updateToCartDisplay();
    },
  async  updateToCartDisplay(){
        // console.log("đay là quantity");
        let cart = localStorage.getItem('cart'); /// lấy dự liệu từ localStorage 
        cart = cart == null? [] :JSON.parse(cart); /// éo kiểu
        let totalProduct =0;
        if(cart.length > 0){
            cart.forEach(element=>{
                totalProduct += element.quantity;
                // console.log(element.quantity);
            });
        }else{
            totalProduct=0;
        }
        
        $('#totalProduct').innerHTML = totalProduct
    },
}
export default  addCart;