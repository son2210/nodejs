import { ParesRequestURl, $ } from './untils.js';
import  species  from '../api/species.js';
import ProductApi  from '../api/productApi.js';
import account from '../localstoget/index'
import  saibarfont from '../components/saibarfrontPage'
import addgiohang from "../components/addGiohang"
 let acc = account.getId()

 const speciesPage = {
    async render() {
        const { id } = await ParesRequestURl(); // link url      
        const { data: specie } = await species.get(id); // id của loài chó  object 
        const { data: pro } = await ProductApi.getAll();  // tất cả sản phẩm  array 
        const  product = pro.filter(item => item.specieId == specie._id);
        if(product.length > 0){
            return `
            <div class="itempage">
                ${await saibarfont.render()}
                <div class="list-product">
                    <div class="row">
                    ${product.map(item=>{
                            return `
                            <div class="col-3 product">
                            <a href="#/products/${item._id}"> <img width="100%"  src="http://localhost:4000/api/products/readPhoto/${item._id}" alt="${item.name}"></a>               
                                <p class="name-product"> <a href="/#/products/${item._id}">${item.name}</a></p>
                                <p class="price-product"> <a href="/#/products/${item._id}">Giá:  ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")} VND  </a> </p>
                                <button class="btn btn-primar"  data-id="${item._id}" id = "addCart"> Thêm Vào Giỏ</button>
                            </div>                     
                            `             
                    }).join('')}
                    </div> 
                </div>
            </div>
            `
        }else{
            return `
            <div class="itempage">
                ${await saibarfont.render()}
            <h2 class="nameSpecie">  Chưa có sản phẩm !</h2>
            </div>
            `
        }
       
    
    },
    async afterRender() {
            let btns = document.querySelectorAll('#addCart')
            btns.forEach (addCarts=>{
                let id = addCarts.dataset.id // id sản phẩm
                addCarts.addEventListener('click', async e=>{
                    e.preventDefault();
                        await  addgiohang.add(id)
                        
                })
            })
            
    }
}
export default  speciesPage