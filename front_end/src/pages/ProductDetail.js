import { $, ParesRequestURl, comeBack } from './untils.js'
import ProductApi from '../api/ProductApi.js';
import category from '../api/categories.js';
import addCart from '../components/addCart.js';
import comment from '../api/commentApi.js';
import acc from "../localstoget/index";
import  swal from 'sweetalert'
import  userComent from '../api/accountApi.js'


const ProductDetailPage = {
    async render() {
        const { id } = ParesRequestURl();
        const { data: product } = await ProductApi.get(id); // id sản phẩm
        const { data: catego } = await category.getAll();
        const loai = catego.filter(cate => cate._id == product.categoryId);
        const { data: binhluan } = await comment.getAll(); // tất bình luận 
     
        let {data:acc} = await userComent.userComent(); // tất cả user  

          let coment = binhluan.filter(item => item.productId == product._id) // bình luân có sản phẩm là chi tiêt 
        return `
        <div class=" detail" id="">
            <div class="row">
                <div class="col-6">
                    <img src="http://localhost:4000/api/products/readPhoto/${product._id}"
                        alt="${product.name}">
                </div>
                <div class="col-6 contentDetail">
                    <h4 class="name-product"> ${product.name} </h4>
             
                    <p id="org" class="madleProduct"> Giới Tính : ${product.gioitinh ? 'Đực' : " Cái "} </p>
                    <p id="org" class="ageProduct"> Tuổi : ${product.age}</p>
                    ${loai.map((item => {
            return `
                            <p id="org"> Giống Loại  : ${item.name}</p>
                            `
        })).join(',')}
                    <p id="org" class="priceProduct">Giá : ${product.price} </p>
                    <button class="btn btn-primar addtoCart" data-id="${product._id}"> Thêm Vào Giỏ</button>
                
                    <ul class="menu-regrim">
                        <li> Hợp đồng mua bán rõ ràng</li>
                        <li>Bảo hành sức khỏe dài hạn.</li>
                        <li>Tiêm phòng, tẩy giun đầy đủ</li>
                        <li> Có Nguồn gốc rõ Ràng </li>
                    </ul>

                </div>
            </div>
            <div class="detailProduct">
                <h3 class="Characteristics"> Đặc Điểm  ${product.name}  </h3>
                <div class="detailCharacteristic">
                
                </div>
            </div>
    </div>
        <h5> Nhận Xét !</h5>
        <form action="" class="form-comment">
            <input type="text"  class="conten-comment" placeholder="Không quá 100 ký  Tự ">
            <button type="submit" class="addComent"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                    fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                    <path
                        d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    <path
                        d="M2.165 15.803l.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                </svg> </button>
            <div class="message">
            </div>
        </form>
        <hr>
            ${coment.map(item=>{
                return  `           
                    <div class="coment">
                        <h5> <b>${acc.find(abc => abc._id == item.adminId).name}</b> <span class="">  </span></h5>
                        <p> ${item.contenComment}</p>
                    </div> 
                `
               
            }).join('')}
        `
    },
    async afterRender() {
        const btns = document.querySelectorAll('.addtoCart');
        btns.forEach(btn => {
            let productId = btn.dataset.id;
            btn.addEventListener('click', async function () {
                await addCart.addtoCart(productId);
            })
        })
        this.valedateComent();
        this.addComent();
    },
    async valedateComent() {
        let contentComent = document.querySelector('.conten-comment');
        contentComent.addEventListener("keyup", async e => {
            // console.log("dạ chạy ");
            if (contentComent.value.length > 10) {
                let abc = contentComent.value
                let c = abc.slice(0, 10)
                contentComent.value = c;
                contentComent.classList.add('err')
                document.querySelector('.message').innerHTML = "Bạn Đã nhập quá 150"
                return false
            } else {
                contentComent.classList.remove('err')
                 return true;
            }
        })
    },
    async addComent() {
        const { id } = ParesRequestURl();
        const { data: product } = await ProductApi.get(id); //id sản phẩm 
        let iduser= await  acc.getId();
        // console.log("xin chào ");
        document.querySelector('.form-comment').addEventListener('submit', async e => {
            let contentComent = document.querySelector('.conten-comment'); // the input
            e.preventDefault();
                if(contentComent.value == ""){
                      document.querySelector('.message').innerHTML = "Không được để trống"
                      contentComent.focus();
                      return false;
                }
                 if(!iduser){
                    document.querySelector('.message').innerHTML = '<p>Vui lòng đăng nhập  <a href="/#/login" > Đăng Nhập </a> ';
                    return false;
                }
                const newComnet = {
                    adminId: iduser.user._id,
                    productId: product._id,
                    contenComment: contentComent.value,
                }
              try {
                let {data}= await comment.add(newComnet)
              
                 await comeBack(ProductDetailPage, '.content-main')
              } catch (error) {
                swal({
                    title: error.response.data.err,
                    text: "You clicked the button!",
                    icon: "success",
                 })
              }
        })
    }
}
export default ProductDetailPage;