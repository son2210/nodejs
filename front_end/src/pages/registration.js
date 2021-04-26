import { ParesRequestURl, $, comeBack } from './untils.js';
import accountApi from '../api/accountApi.js';
import swal from 'sweetalert'
const registration = {
    async render() {
        return `
        <form  action="" id="form-user" class="form-addProduct">
     
            <div class="form-row">
                <div class="col-md-12 mb-3">
                    <label for="nameUer">Full Name</label>
                    <input type="text" id="nameUer" placeholder="Họ và Tên"  >
                </div>
                <div class="col-md-12 mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="email"  id="email" placeholder=" email "  required>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="Password">Password</label>
                    <input type="password" id="password" placeholder="password"  >
                </div>
                <div class="col-md-12 mb-3">
                <button type="submit" class="btn btn-danger"> Đăng ký   </button>
                </div>
            </div> 
        </form>    
        `
    },
    async afterRender() {
        $('.form-addProduct').addEventListener('submit', async e => {
            e.preventDefault();
            const userName = $('#nameUer');
            const Email = $('#email');
            const password = $('#password');
            if (userName.value.length <= 6 || userName.value.length > 100) {
                userName.focus();
                return false;
            }
            if (password.value.length < 8) {
                password.focus();
                return false;
            }
            var user = {
                name: userName.value,
                email: Email.value,
                password: password.value
            }
            const { data: admin } = await accountApi.add(user);
            if (admin) {
              let  account = {
                    email: Email.value,
                    password: password.value
                }
                try {
                    const { data: bien } = await accountApi.signin(account);
                    let acc = sessionStorage.getItem('user'); // tạo file tên user
                             acc = acc == null ? [] : JSON.parse(acc); // ép chuỗi sang  json data 
                             acc.push(bien);
                             await sessionStorage.setItem('user', JSON.stringify(acc))
                             window.location.hash = '#'
                             window.location.reload(); 
                } catch (error) {
                        console.log("sai " +  error ); 
                }
            }else{
                console.log("đăng ký thất bại ");
            }

        })
    }
}
export default registration
