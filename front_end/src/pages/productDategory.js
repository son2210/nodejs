import { ParesRequestURl, $ } from './untils.js'; // đường link url 
import  category  from '../api/categories.js'; // đường link categories
import  ProductApi from '../api/productApi.js'; // tất cả sản phẩm 
import saibarfont from '../components/saibarfrontPage.js';
export  const productCategory ={
   async render(){
    const {id } = await ParesRequestURl();
    const {data : product}= await ProductApi.getAll();
    const {data:cate} = await category.get(id);
        let pro = product.filter(item => item.categoryId == cate._id)
        if(pro.length > 0){
            return `
            <div class="itempage">
                ${await saibarfont.render()}
                 <div class="list-product">
                    <div class="row">
                    ${product.map(product=>{
                        console.log(product._id);
                        if(product.categoryId == cate._id){
                            return `
                            <div class="col-3 product">
                            <a href="#/products/${product._id}">  <img width="100%" src="http://localhost:4000/api/products/readPhoto/${product._id}" alt="${product.name}"></a>               
                                <p class="name-product"> <a href="/#/products/${product._id}">${product.name}</a></p>
                                <p class="price-product"> <a href="/#/products/${product._id}"> Giá: ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}</a> </p>
                                <button class="btn btn-primar"> Thêm Vào Giỏ</button>
                            </div>                     
                            `
                        }
                    }).join('')}
                  </div>
                </div>
            </div>
            `
        }
        return `
        <div class="itempage">
            ${await saibarfont.render()}
                 <h5 class="nameSpecie">  Chưa có sản phẩm </h5>
        </div>
        `

    }
}
export default productCategory