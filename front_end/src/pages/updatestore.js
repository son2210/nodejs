import saibarMenuAdmin from "../components/saibarMenuAdmin"
import { ParesRequestURl, $, comeBack } from './untils'
import stores from '../api/storeApi'
import swal from 'sweetalert'
const updatStore = {
    async render() {
        try {
            const { id } = await ParesRequestURl();
            const { data: store } = await stores.get(id);
            return `
            <div class="bluer"> 
                <div class="container-fulid admin">
                    ${await saibarMenuAdmin.render()}
                    <div class="list"> 
                            <h4 class="title"> Cập Nhật  </h4>
                            <div class="from" > 
                                <form action="" class="updateStore" >
                                <div class="from-grup">
                                    <label for=""> Name Shop  </label>
                                    <input type="text"  id="name" placeholder="Tên Shop" value="${store.name}">
                                </div>
                                <div class="from-grup">
                                    <label for=""> Logo Shop  </label>
                                    <input type="file"  id="image" placeholder="logo ">
                                </div>
                                <div class="from-grup">
                                    <label for=""> Phone  </label>
                                    <input type="text"  id="phone"" placeholder="Số điện thoại" value="${store.phone}" >
                                </div>
                            
                                <div class="from-grup">
                                    <label for="">  Địa Chỉ </label>
                                    <input type="text"  id="address"" placeholder="  Địa Chỉ  " value="${store.address}" >
                                </div>
                               
                                <div class="from-grup">
                                    <label for="">  Mô tả </label>
                                    <input type="text"  id="descipiton"" placeholder="   " value="${store.descipiton}" >
                                </div>
                               
                            
                                <div class="form-grup">
                                <button type="submit" class="btn btn-danger"> Cập Nhật   </button>
                                </div>

                        </form>   
                    
                            
                            </div>
                    </div>
                </div>
            </div>
        `
        } catch (error) {
            swal({
                title: error,
                icon: "warning",
                button: "ok"
            });
            window.location.hash = "/admin"
        }

    },
    async afterRender() {
        const { id } = await ParesRequestURl();
        let photo = $('#image').files[0];
        $('.updateStore').addEventListener('submit', async e => {
            e.preventDefault();
            let name = $('#name').value;
            let phone = $('#phone').value;
            let address = $('#address').value;
            let descipiton = $('#descipiton').value
            let photo = $('#image').files[0];
            let fromdata = new FormData()
            fromdata.append("name", name)
            fromdata.append("phone", phone)
            fromdata.append("address", address)
            fromdata.append("descipiton", descipiton)
            if (photo) {
                fromdata.append("photo", photo)
            }
            try {
                const { data: store } = await stores.update(id, fromdata)
                window.location.hash ="/store"
              ;

            } catch (error) {
                console.log(erro.response.error.err); 
            }
        })
    }
}
export default updatStore