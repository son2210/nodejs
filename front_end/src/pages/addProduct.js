import species from '../api/species.js';
import category from '../api/categories.js';
import { ParesRequestURl, $, comeBack } from './untils.js';
import ProductApi from '../api/productApi.js'
// import { uploadFile } from './../firebase/index.js';
import saibarMenuAdmin from '../components/saibarMenuAdmin.js';
import swal from 'sweetalert';
const addProduct = {
    async render() {
        const { data: specie } = await species.getAll();
        const { data: cate } = await category.getAll();
        return `
        <div class="bluer">
            <div class="container-fulid admin">
                ${await saibarMenuAdmin.render()}
                <div class="list">
                    <h4 class="title"> Thêm Sản Phẩm </h4>
                    <div class="from">
                        <form action=" " method ="POST" class="form-addProduct">
                            <div class="from-grup">
                                <label for=""> Tên Sản Phẩm </label>
                                <input type="text" id="namePro" placeholder=" Tên sản Phẩm ">
                            </div>
                            <div class="from-grup">
                                <label for=""> Ảnh Sản Phẩm </label>
                                <input type="file"  id="imgPro" required>
                            </div>
                            <div class="from-grup">
                                <label for=""> Giá Sản Phẩm </label>
                                <input type="text"  id="price" placeholder=" Price product " >
                            </div>
                            <div class="from-grup">
                                <label for=""> Độ Tuổi Sản Phẩm </label>
                                <input type="text"  id="age" placeholder=" Price product " >
                            </div>
                            <div class="from-grup">
                                <label for=""> Số Lượng </label>
                                <input type="text" id="quantity" placeholder="Số lượng ">
                             </div>
                             <div class="form-grup malde">
                                   <label id="gioitinh" for=""> Giới Tính
                                        <input type="radio" name="checked" id="maidle" checked value="0"> Đực
                                        <input type="radio" name="checked" id="maidle" value="1"> Cái                       
                                    </label>
                            </div>
                            <div class="from-grup">
                                <label for=""> Shop Cưng  </label>
                                        <select name="giong" id="loai" class="chon">
                                            <option value=""> Loài </option>
                                        ${specie.map(specie => {
            return `
                                            <option value="${specie._id}"> ${specie.name} </option>
                                         `
                                    }).join('')}
                                        </select>
                              </div>
                              <div class="from-grup">
                                <label for=""> Giống loại  </label>
                                    <select name="giong" id="giong" class="chon">
                                        <option value=""> Loại Vật  </option>
                                            ${cate.map(category => {
                                           return `
                                                    <option value="${category._id}"> ${category.name} </option>
                                                `
                                }).join('')}
                                    </select>
                                    
                                   
                                </div>
                                <div class="from-grup">
                                <label for="" class="decoration"> Mô tả</label>
                                     <textarea name="" id="description" cols="55" rows="2"></textarea>
                             </div>
                            <div class="from-grup">
                                <button class="btn btn-danger addProduct" type="submit"> Thêm Sản Phẩm </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     `
    },
    async afterRender() {
        $('.form-addProduct').addEventListener('submit', async e => {
            e.preventDefault();
            const productImage = $('#imgPro').files[0]; // avata product 
            console.log(productImage);
            let gioitinh;
            let maidle = document.querySelectorAll('#maidle');
            for (let i = 0; i < maidle.length; i++) {
                if (maidle[i].checked == true) {
                    gioitinh = maidle[i].value
                }
            }
            let nameproduct = $('#namePro'); // tên sản phâm r
            let categoryId = $('#giong') // giống loại 
            let price = $('#price'); // giá 
            let age = $('#age'); // độ tuổi 
            let specieId = $('#loai'); // loại nào 
            let TotalquantityProduct = $('#quantity'); // số lượng 
            let description = $('#description');

            await this.check();
            let fromAddProduct = new FormData();
            fromAddProduct.append('name', nameproduct.value);
            fromAddProduct.append('description', description.value);
            fromAddProduct.append('price', price.value);
            fromAddProduct.append('age', age.value);
            fromAddProduct.append('quantity', TotalquantityProduct.value);
            fromAddProduct.append('gioitinh', gioitinh);
            fromAddProduct.append('photo', productImage);
            fromAddProduct.append('categoryId', categoryId.value);
            fromAddProduct.append('specieId', specieId.value);
            try {
                let { data } = await ProductApi.add(fromAddProduct)
                if (data) {
                    swal({
                        title: "Thêm Sản Phẩm Thành Công ",
                        icon: "success"
                    })
                    await comeBack(addProduct, '#content-product');
                    window.location.hash = '/listproduct'
                }
            } catch (error) {
                console.log(error);
            }
        })
    },
    async check() {
        let gioitinh;
        let maidle = document.querySelectorAll('#maidle');
        for (let i = 0; i < maidle.length; i++) {
            if (maidle[i].checked == true) {
                gioitinh = maidle[i].value
            }
        }
        let nameproduct = $('#namePro'); // tên sản phâm r
        let categoryId = $('#giong') // giống loại 
        let price = $('#price'); // giá 
        let age = $('#age'); // độ tuổi 
        let specieId = $('#loai'); // loại nào 
        let TotalquantityProdcuct = $('#quantity'); // số lượng 
        let description = $('#description');
        if (nameproduct.value == "") {
            nameproduct.focus();
            nameproduct.classList.add('err');
            return false;
        }
        nameproduct.classList.remove('err');
        // giá sản phẩm 
        if (!Number(price.value) || Number(price.value) <= 0) {
            price.focus();
            price.classList.add('err');
            return false;
        }
        price.classList.remove('err');
        // tuổi 
        if (age.value == "") {
            age.focus();
            age.classList.add('err');
            return false;
        }
        age.classList.remove('err');
        //  số lượng 
        if (!Number(TotalquantityProdcuct.value) || Number(TotalquantityProdcuct.value) <= 0) {
            TotalquantityProdcuct.focus();
            TotalquantityProdcuct.classList.add('err');
            return false;
        }
        TotalquantityProdcuct.classList.remove('err');
        //  loại shop nào 
        if (specieId.value == "") {
            specieId.classList.add('err');
            return false;
        }
        specieId.classList.remove('err');

        // giống nào 
        if (categoryId.value == "") {
            categoryId.focus();
            categoryId.classList.add('err')
            return false;
        }
        categoryId.classList.remove('err')
        if (description.value == "") {
            description.focus();
            description.classList.add('err')
            return false;
        }
        description.classList.remove('err')
        console.log("đến đây");
        return true;
    }
}
export default addProduct
