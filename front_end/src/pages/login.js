import { ParesRequestURl, $, comeBack } from './untils.js';
import accountApi from '../api/accountApi.js';
import swal from 'sweetalert'
const login = {
    async render() {
        return `
            <form action="" id="form-user" class="form-login">
                <div class="">
                    <label for="email"> Tài Khoản</label>
                    <input type="email" id="email" placeholder=" email ">
                </div>
                <div class="">
                    <label for="Password">Password</label>
                    <input type="password" id="password" placeholder="password">
                </div>
                <div class="">
                    <label for="Password" style="color:red" id="reuslt"></label>
                </div>
                <button type="submit" class="btn btn-danger"> Đăng Nhập </button>
            </form>
      
        `
    },
    async afterRender() {
        $('.form-login').addEventListener('submit', async e => {
            e.preventDefault();
              // email  và pass 
            let email = document.querySelector('#email').value;
            let pasword = document.querySelector('#password').value;
            
            let user = {
                "email": email,
                'password': pasword
            }
            
            try {
                const { data } =   await accountApi.signin(user);
                if(data){
                    swal({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success", 
                     })
                     let acc = sessionStorage.getItem('user'); // tạo file tên user
                             acc = acc == null ? [] : JSON.parse(acc); // ép chuỗi sang  json data 
                             acc.push(data);
                             await sessionStorage.setItem('user', JSON.stringify(acc))
                             window.location.hash = '#'
                             window.location.reload();
                }else{
                    document.querySelector('#reuslt').innerHTML = "Đăng Nhập Thất Bại !"
                }
            } catch (error) {
                console.log(error.response.data.err);
                // document.querySelector('#reuslt').innerHTML = error.response.data.err
            }
           
        })

    },
}
export default login