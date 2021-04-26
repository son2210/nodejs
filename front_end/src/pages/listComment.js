
import saibarMenuAdmin from "../components/saibarMenuAdmin";
import comment from '../api/commentApi.js'
import  accountApi from '../api/accountApi.js';
import ProductApi from '../api/productApi.js';
 import  {comeBack}  from "./untils"
 import swal from 'sweetalert'
const listCommet ={
    async  render(){
            const {data:coment} = await comment.getAll() // array bình luận 
            const {data:prod} = await  ProductApi.getAll() // tất cả sp
        const dataCmt = prod.map(prd => {
            const listCmt = coment.filter(cmt => {
                return cmt.productId == prd._id;
            })
    
            const timeCmt = listCmt.map(cmt => {
                if(cmt.productId == prd._id){
                    return cmt.createdAt;
                }
            })
            const listName = listCmt.map(cmt => {
                if(cmt.productId == prd._id){
                    return prd.name;
                }
            })
            const cmt = {
                idPrd: prd._id,
                name: listName[0],
                quantity: listName.length,
                timeCmt: timeCmt[0]
            }
            return cmt;
        })
        let index=0;
        return  `
        <div class="bluer">
        <div class="container-fulid admin">
            ${await saibarMenuAdmin.render()}
            <div class="list">
               <table class="table">              
                  <thead class="thead">
                     
                           <th  class="stt" > STT </th>
                           <th> Name Sản Phẩm  </th>
                           <th> Hình Ảnh   </th>
                           <th> Số Lượng </th>
                           <th> Thời Gian  </th>
                           <th> ACTISON </th>

                  </thead>
                  <tbody>
                    ${dataCmt.map((element)=>{
                         if(element.name  != undefined ){
                            return `
                            <tr>  
                            <td> ${index+=1} </td>
                            <td> ${element.name}  </td>
                            <td> <img src="http://localhost:4000/api/products/readPhoto/${element.idPrd}" alt=""></td>
                           <td> ${element.quantity} </td>
                            <td>${element.createdAt}  </td>
                            <td class="action">
                            <button class="icon repair">
                                 <a href="/#/comentdetail/${element.idPrd}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor"
                                        class="bi bi-arrow-up-left-square" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.096 8.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707l4.096 4.096z" />
                                    </svg>
                                </a>
                            </button>
                        </td>
                            </tr>
                            `
                         }
                        console.log(element);
                           
                    }).join('')}  
                   
                 </tbody>
              </table>

            </div>
        </div>
      </div>
    `
    },
    // async  afterRender(){
    //      const btns  = document.querySelectorAll('#remove')
    //      btns.forEach(btn=>{
    //         let id = btn.dataset.id
    //         btn.addEventListener('click', async e=>{
    //            console.log(id);
    //             let question  = confirm('Are you sure you want to coment')
    //             if(question){
    //                try {
    //                  const {data} = await  comment.remove(id);
    //                  setTimeout(function(){ 
    //                     swal({
    //                        title: data.message, 
    //                     })
    //                   },2000);
                      
    //                  setTimeout(function(){ 
    //                     comeBack(listCommet, '.content-main')
    //                   }, 3000);
                      
                    
    //                } catch (error) {
    //                     console.log(error.response.data.err)
    //                }
    //             }
    //         })
    //      })
    // }
}
export default  listCommet;