import orders from '../api/orderApi.js';  // link thêm order 
import { $, comeBack } from './untils.js';
// import addCart from '../components/addCart.js' // cái cũ 
import account from '../localstoget/index' // lấy tài khoản ở localstoget
import cartAll from '../api/cart' // tất cả giỏi hàng 
import products from '../api/productApi'
// import  account  from '../localstoget/index' // cái cũ 
import addgiohang from '../components/addgiohang.js'; // giỏ hàng 
const Cart = {
  async render() {
    await addgiohang.updategiohang(); // cập nhật só lượng cart
    let acc = account.getId(); // user
    const { data: cart } = await cartAll.getAll();
    const {data : product} = await products.getAll();
    let slPrd_userId = cart.filter(item => item.iduser == acc.user._id)
    // console.log(slPrd_userId);
    let totalMoneny = 0
    if (!acc) {
      return `      
         <h2> Bạn Cần đăng nhập  </h2>
      `
    }else{
      if (slPrd_userId.length > 0) {
        return `
          <h2 style="text-align:center">Giỏ hàng</h2>
            <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Sản Phẩm </th>
                    <th scope="col">Sản Phẩm </th>
                    <th scope="col">Số lượng </th>
                    <th scope="col">THành Tiền </th>
                    <th scope="col">Xóa</th>
                  </tr>
                </thead>
                <tbody>

                ${slPrd_userId.map((item, index) => {
                   totalMoneny += item.quantity * product.find(element => element._id == item.idProduct).price
                               return `
                                          <tr>
                                              <th scope="row">${index + 1}</th>
                                              <td> ${product.find(element => element._id == item.idProduct).name}   </td>
                                              <td style="width: 150px;"><img src="http://localhost:4000/api/products/readPhoto/${item.idProduct}"  class="d-block w-100" alt="..."></td>
                                              <td> <input style="width:3em" type="number" class="soluong"  value="${item.quantity}">  </td>
                                              <td> ${ (product.find(element => element._id == item.idProduct).price *item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}  </td>
                                            <td>
                                                  <button  id="remove" data-id="${item._id}">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="45" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                  </button>
                                              </td>
                                          </tr>

                                  `
                     }).join('')}
                              <tr>
                                  <td colspan="5">Tổng Tiền </td>
                                  <td>${(totalMoneny).toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")} VND</td>
                               </tr>
                </tbody>
              </table>
          <form class="form-order">
            <!-- from điền thông tin  -->
            <h2 style="text-align:center;margin-top: 50px;">Thông Tin</h2> <br>
            <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Họ Và Tên Quý Khách *</label>
                  <input type="text" class="form-control" id="nameKH" placeholder="Fullname" >
                </div>
                <div class="form-group col-md-6">
                  <label for="email">Email *</label>
                  <input type="email" class="form-control" id="email" placeholder="Email" >
                </div>
              </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="phone"> Số Điện Thoại *</label>
                  <input type="text" class="form-control" id="phone" placeholder="Number Phone" >
                </div>
                <div class="form-group col-md-6">
                  <label for="address"> Địa Chỉ  *</label>
                  <input type="text" class="form-control" id="address" placeholder="Số nhà - Thôn(xóm)-xã(phường) - Quận (Huyện) - Tỉnh (Thành Phố)" >
                </div>
              </div>
            </div>

            <button style="float:right" type="submit" class="btn btn-danger">Đặt Hàng </button>
          </form>
    `
      } else {
        return `
           <div class="result-cart">
              <h3> Chưa có sản phẩm nào trong giỏ hàng  </h3>
              <a href="/#/"> Tiếp Tục Mua Hàng  </a> 
           </div>
           `

      }
    }
  },
  async afterRender() {
    await this.remove();
    let acc = account.getId();
    const { data: cart } = await cartAll.getAll(); // giỏ hàng 
    let slPrd_userId = cart.filter(item => item.iduser === acc.user._id) //lấy
    let idOder = slPrd_userId.map(item =>{ return item._id }) // lấy id order 

    let formSubmit =  document.querySelector('.form-order')
    if(formSubmit != null){
      formSubmit.addEventListener('submit',async e => {
        e.preventDefault();
         this.check(); 
        const nameKh = $('#nameKH').value;
        const email = $('#email').value;
        const phone = $('#phone').value;
        const address = $('#address').value;
        let newOrder = {
          arrOrder : idOder,
          userId :acc.user._id,
          address : address,
          nameKh : nameKh,
          phone : phone,
          email : email
        };
          try {
            const {data} =  await  orders.add(newOrder)
            console.log(data);
          } catch (error) {
              console.log(error.response.data.err);
          }
      })
    }
  
  },
  async remove() {
    const btns = document.querySelectorAll('#remove')
    if (btns != null) {
      btns.forEach(btn => {
        let id = btn.dataset.id // id sp
        btn.addEventListener("click", async e => {
          e.preventDefault();
           const question = confirm( 'Bạn chăc muốn xóa !');
           if(question){
              try {
                const {data} = await cartAll.remove(id)
                window.location.hash ='/cart'  
                alert (data.message)
                // comeBack(render , '.' )
                await comeBack(Cart, '.content-main')
                addgiohang.updategiohang();
              } catch (error) {
                  alert (error.response.data.err)
              }
           }
        })
      })
    }
  },
  async check() {

    const nameKh = $('#nameKH');
    const email = $('#email');
    const phone = $('#phone');
    const address = $('#address');
    if (nameKh.value < 10) {
      nameKh.focus();
      nameKH.classList.add('error')
      return false;
    }
    nameKH.classList.remove('err')
    if (email.value < 10) {
      email.focus();
      email.classList.add('error')
      return false;
    }
    email.classList.remove('err')
    // var phoneno = /^\+?([0-9]{2})\)?[-.]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if ( phone.value == "") {
      phone.focus();
      phone.classList.add('err')
      return false;
    }
    phone.classList.remove('err')
    if (address.value == "") {
      address.focus();
      address.classList.add('err')
      return false;
    }
    address.classList.remove('err')
    return true;
  }
}
export default Cart;
