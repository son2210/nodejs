import accountApi from "../api/accountApi.js";
import saibarMenuAdmin from "../components/saibarMenuAdmin.js";
import {ParesRequestURl,$,comeBack} from './untils';
  const updateAccount ={ 
    async  render(){
        const {id} =  await ParesRequestURl();
        const {data:account} = await accountApi.get(id);
        return `
        <div class="bluer">
            <div class="container-fulid admin">
                    ${ await saibarMenuAdmin.render()}
                    <div class="list">
                    <h4 class="title"> Cập Nhật   </h4>
                        <div class="from">
                                <form action="" class="form-updateAcc">
                                    <button type="submit" class="btn btn-primary"> Cập Nhật   </button>
                                    <div class="from-grup">
                                        <label for=""> Họ và Tên  </label>
                                        <input type="text" id="nameUer" value="${account.user.name}" >
                                    </div>
                                    <div class="from-grup">
                                        <label for="">Email</label>
                                         <input type="text"class="email" id="email" value="${account.user.email}" readonly>
                                    </div>
                                    <div class="from-grup">
                                        <label for="">mật khẩu  </label>
                                        <input type="text" id="password" value="">
                                    </div>
                                    <div class="from-grup">
                                        <label for="">Quyền</label>
                                        <input type="radio"  id="radio" value="1" name ="checked" > quản trị 
                                        <input type="radio"  id="radio" value="0" name ="checked" checked> không
                                    </div>

                                </form>   
                            </div>  
                    </div>  
                </div>  
            </div>  
        </div>  
            `
    },
    async  afterRender(){
        const {id} =ParesRequestURl();
        $('.form-updateAcc').addEventListener('submit',async e =>{
            e.preventDefault();
            let maidle = document.querySelectorAll('#radio');
            let  role ;
            for (let i = 0; i< maidle.length; i++) {
                if (maidle[i].checked == true) {
                    role = maidle[i].value;
                }
            }
            const updateAcc = {
                name: $('#nameUer').value,
                email: $('#email').value,
                password: $('#password').value,
                role: role
            }
            console.log(updateAcc);
          let {data}= await accountApi.update(id,updateAcc);
          if(data){
            window.location.hash = '/account';
              console.log("đúng");
          }else{
              console.log("sai");
          }

        //    await comeBack(updateAccount, '#content-account');
       
        })
    }
}
export default  updateAccount