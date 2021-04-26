import {ParesRequestURl, $ , comBack} from './untils.js';
import  ProductApi from '../api/productApi.js';
import species from '../api/species.js';
import category from '../api/categories.js'
import saibarMenuAdmin from "../components/saibarMenuAdmin";

// console.log(species);
const updateProduct ={
        async render(){
            const {id} = await  ParesRequestURl();
            const {data:product} = await ProductApi.get(id);
            const {data:specie} = await species.getAll();
            const {data:specieDetails} = await species.get(product.specieId);
            // console.log(specieDetails);

            const {data:cate} = await category.getAll();
            const {data:cateDetails} = await category.get(product.categoryId);
           
            return `
            <div class="bluer">
                <div class="container-fulid admin">
                    ${await saibarMenuAdmin.render()}
                    <div class="list">
                    <h4 class="title"> Cập Nhật  Sản Phẩm   </h4>
                    <div class="from">
                        <form action="" method ="POST" class="updatedProduct" id="content-product">
                        
                            <div class="from-grup">
                                <label for=""> Tên Sản Phẩm </label> 
                                <input type="text" id="namePro" placeholder="name product" value="${product.name}" />
                            </div>
                            <div class="from-grup">
                                <label for=""> Ảnh Sản Phẩm </label> 
                                 <input type="file" id="imgPro" >
                                <img width="100px" src="http://localhost:4000/api/products/readPhoto/${product._id}" />
                            </div>
                            <div class="from-grup">
                                <label for=""> Giá Sản Phẩm </label>
                                 <input type="text" id="price" placeholder="Price product" value="${product.price}">
                            </div>
                            <div class="from-grup">
                                <label for=""> Số Lượng</label>
                                 <input type="text" id="quantity" placeholder="Price product" value="${product.quantity}">
                            </div>
                            <div class="from-grup">
                                <label for=""> Độ Tuổi </label>
                                <input type="text" id="age" value="${product.age}" >
                            </div>
                            <div class="from-grup ">
                                <label id="gioitinh" for=""> Giới Tính</label>
                                    <input type="radio" name="checked" id="radio" checked value="1"> Đực
                                    <input type="radio" name="checked" id="radio" value="0"> Cái
    
                            </div>
                            <div class="from-grup">
                                <label for=""> Shop Cưng (specieID)
                                    <select name="giong" id="loai" class="chon">
                                        <option value="${specieDetails._id}"> ${specieDetails.name} </option>
                                    ${specie.map(specie => {
                                         return `
                                        <option value="${specie._id}"> ${specie.name} </option>
                                        `
                                     }).join('')}
                                    </select>
                                </label>
                            </div>
                            <div class="from-grup">
                                <label for=""> Giống loại (madle)
                                    <select name="giong" id="giong" class="chon">
                                        <option value="${cateDetails._id}">${cateDetails.name}  </option>
                                    ${cate.map(category => {
                                        return `
                                               <option value="${category._id}"> ${category.name} </option>
                
                                        `
                                          }).join('')}
                                    </select>
                                </label>
                            </div>
                            <hr class="hrr">
                            <div class="from-grup">
                                    <label for="" class="decoration"> Mô tả</label>
                                    <textarea name="" id="description" cols="55" rows="2"> ${product.description}</textarea>
                            </div>
                            <div class="from-grup">
                                    <button class="btn btn-primary" type="submit" >Cập Nhật Sản phẩm  </button>
                            </div>
                
                        </form>
                    </div>
                </div>
            </div>
    </div>
            `
        },
         async  afterRender(){
            const {id} = await  ParesRequestURl();
             const  updatePro = document.querySelector('.updatedProduct')
             updatePro.addEventListener("submit", async e=>{
                e.preventDefault();
                let productImage = $('#imgPro').files[0];
                let  gioitinh;
                let maidle = document.querySelectorAll('#radio');
                for (let i = 0; i < maidle.length; i++) {
                    if (maidle[i].checked == true) {
                        gioitinh = maidle[i].value
                    }
                }
                // console.log(gioitinh);
                let nameproduct = $('#namePro').value; // tên sản phâm r
                let categoryId = $('#giong').value // giống loại 
                let price = $('#price').value; // giá 
                let age = $('#age').value; // độ tuổi 
                let specieId = $('#loai').value; // loại nào 
                let TotalquantityProduct = $('#quantity').value; // số lượng 
                let description = $('#description').value; // mô tả 

                let fromUpdateProduct = new FormData();
                fromUpdateProduct.append('name', nameproduct);
                fromUpdateProduct.append('description', description);
                fromUpdateProduct.append('price', price);
                fromUpdateProduct.append('age', age);
                fromUpdateProduct.append('quantity', TotalquantityProduct);
                fromUpdateProduct.append('gioitinh', gioitinh);
                if(productImage){
                    fromUpdateProduct.append('photo', productImage);
                }
              
                fromUpdateProduct.append('categoryId', categoryId);
                fromUpdateProduct.append('specieId', specieId);
                 try {
                     const{data} = await  ProductApi.update(id, fromUpdateProduct)
                    if(data){
                        window.location.hash = '/listproduct'
                    }
                    console.log( error.response.data.err);
                 } catch (error) {
                        console.log( error.response.data.err);
                 }
             })
         }
}
export default updateProduct;