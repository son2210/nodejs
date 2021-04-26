import { ParesRequestURl, $, comeBack } from '../pages/untils.js';
import accountApi  from '../api/accountApi.js';
import saibarMenuAdmin  from '../components/saibarMenuAdmin.js';
// import firebase from '../firebase';
 const addAccount = {
    async render() {
        return `
        <div class="bluer">
            <div class="container-fulid admin">
            ${ await saibarMenuAdmin.render()}
            <div class="list">
            <h4 class="title"> Thêm Tài Khoản  </h4>
                      <div class="from">
                            <form action="" class="form-adduser" >
                                <div class="from-grup">
                                    <label for=""> Họ và Tên </label>
                                    <input type="text"  id="nameUer" placeholder=" Họ Và Tên  ">
                                </div>
                                <div class="from-grup">
                                    <label for=""> Email </label>
                                    <input type="text"  id="email"" placeholder=" Email " required>
                                </div>
                             
                                <div class="from-grup">
                                    <label for=""> Mật Khẩu </label>
                                    <input type="password"  id="password"" placeholder=" Password " >
                                </div>
                             
                                <div class="form-grup">
                                <button type="submit" class="btn btn-danger">Thêm Tài Khoản  </button>
                                </div>
                        </form>                 
                </div>  
            </div>  
        </div>  
        `
    },
    async afterRender() {
        $('.form-adduser').addEventListener('submit', async  e => {
            console.log("ok");
            e.preventDefault();
            const userName = $('#nameUer'); // tên tài khoản 
            const Email = $('#email'); // email 
            const password = $('#password'); // mật khẩu 
            if(userName.value.length <=8 && userName.value.length <100){ //kiểm tra tên đăng nhập ... 
                userName.focus(); 
                userName.classList.add('err')
                return false;
            }
            userName.classList.remove('err')
            if(password.value.length <8){ // kt passwork k dc nhỏ hơn 8 
                password.focus();
                password.classList.add('err')
                return false;
            }
            password.classList.remove('err')
            var user = {
                name: userName.value,
                email: Email.value,
                password:password.value,
            }
            await accountApi.add(user);
            comeBack(addAccount, '#content-account');
            window.location.hash = '/account'
        })
    }
}
export default  addAccount