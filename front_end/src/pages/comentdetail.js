import {ParesRequestURl, $ , comBack} from './untils'
import coment from '../api/commentApi'
import saibarMenuAdmin from '../components/saibarMenuAdmin'
import accountApi from '../api/accountApi.js';
const comentdetail={
 async   render(){
        const {id} = await ParesRequestURl();
        const {data:cmt }  = await coment.getAll()
        const {data:account }  = await accountApi.userComent()
       return `
       <div class="bluer">
        <div class="container-fulid admin">
            ${await saibarMenuAdmin.render()}
            <div class="list">
                <h4 class="title">  Chi Tiết Bình Luận  </h4>
                <table class="table">
                    <thead class="thead">
                        <th class="stt">STT </th>
                        <th> TÀI KHOẢN </th>
                        <th>NỘI DUNG  </th>
                     
                        <th> ACTION </th>
                    </thead>
                    <tbody>
                        ${cmt.map((item, index) =>{
                            if(item.productId == id){
                                return `
                                <tr>
                                    <th>${index+1} </th>  
                                    <td>${account.find(e => e._id ==  item.adminId).name}</td>
                                    <td>${item.contenComment}</td>
                                    <td class="action">
                                    </button>
                                    <button class="icon delete"  id="remove" data-id="${item._id}">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                             <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                          </svg>
                                    </button> 
                                    </td>
                                </tr>                        
                                
                                `
                            }
                            
                        }).join('')}
                    </tbody>
                </table>
                </div>          
            </div>          
        </div>          
       
       `
    },
    async afterRender() {
        const btns = document.querySelectorAll('#remove')
        btns.forEach(btn=>{
            let id = btn.dataset.id
            btn.addEventListener('click',async  e=>{
                let question  = confirm (" Bạn có muốn xóa không ?")
                if(question){
                        await  coment.remove(id)
                   comBack(comentdetail , '.content-main')
                   window.location.hash =`/comentdetail/${id}`
                }
            })
        })
    }
}
export default comentdetail