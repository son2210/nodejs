import swal from 'sweetalert';
import contacts from  '../api/contactApi.js'
import { comeBack } from './untils.js';
const contact = {
    async render() {
    window.scrollTo(0, 0);
        return `
                <div class="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863855881403!2d105.74459841440749!3d21.038132792835363
                        !2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVja
                        G5pYw!5e0!3m2!1svi!2s!4v1614849169686!5m2!1svi!2s" width="100%" height="400" style="border:0;"
                    allowfullscreen="" loading=""></iframe>
            </div>
            <form class="form-contact"> 
                <h5>Thông Tin Phản Hồi </h5>
            <div class="from-grup">
                <label for=""> Họ Và Tên </label>
                <input type="text" class="user-contact" placeholder="Họ tên quý khách ">
            </div>
            <div class="from-grup">
                <label for=""> Email </label>
                <input type="Email" class="email-contact" placeholder=" Địa chỉ email" required>
            </div>
            
            <div class="from-grup">
                
                <label for=""> Nội Dung  </label>
                <textarea name="" id="noidung" class="content-contact" cols="38" rows="2"> </textarea>
            
            </div>
            <span class="message"> </span>
            <div class="from-grup">
                <button class="btn btn-primary add-contact"> Gửi Phải Hồi </button>
            </div>
            </form>

         `
       
    },
    async  afterRender(){
        let contentcontact = document.querySelector('.content-contact');      
        let user = document.querySelector('.user-contact');
        let email = document.querySelector('.email-contact');
        document.querySelector('.form-contact').addEventListener('submit', async e => {
            e.preventDefault();
            if(user.value ==""){
                    user.focus();
                    user.classList.add('error')
                    document.querySelector('.message').innerHTML = 'Chưa điền họ tên '
                    return false;
            }else if(user.value.length <10){
                    user.focus();
                    user.classList.add('error')
                    document.querySelector('.message').innerHTML = 'Họ Tên quá Ngắn '
                    return false;
            }
                user.classList.remove('error')
                document.querySelector('.message').innerHTML = ' '
            if(contentcontact.value.length <5) {
                contentcontact.focus();
                document.querySelector('.message').innerHTML ='Nọi dung quá ngắn '
                return false;
            }
            const newComnet = {
                name: user.value,
                email: email.value,
                contentfeeback: contentcontact.value
            }
            console.log(newComnet);
            try {
                let {data}  = await contacts.add(newComnet);
                swal({
                    title: data.message,
                    icon: "success",                         
                });
                 await comeBack(contact,'.content-main');
            } catch (error) {
                 swal({
                    title:error.response.data.err,
                    icon: "success",                         
                });   
            }
       
          console.log(data);
           
           
        })
        
     this.validate();
    },
     async validate(){
        let contentcontact = document.querySelector('#noidung');
            contentcontact.addEventListener("keyup", async e =>{
                console.log("đã chạy ");
                if (contentcontact.value.length > 10) {
                    let abc = contentcontact.value
                    let c = abc.slice(0, 10)
                    contentcontact.value = c;
                    contentcontact.classList.add('error')
                    document.querySelector('.message').innerHTML = 'Bạn đã nhập quá 120 ký tự '
                    return false
                } else {
                    contentcontact.classList.remove('error')
                    document.querySelector('.message').innerHTML = ' '
                }
            })
            
    }

}
export default contact