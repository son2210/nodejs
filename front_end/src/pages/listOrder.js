import  saibarMenuAdmin from '../components/saibarMenuAdmin.js';
import orders from '../api/orderApi.js';
import  products from '../api/accountApi'
// import  cart from '../api/'
import {comeBack} from './untils.js'
const listOrder={
    async  render(){
        const {data:order} = await orders.getAll();
        console.log(order);
        return `
      <div class="bluer">
        <div class="container-fulid admin">
            ${await saibarMenuAdmin.render()}
            <div class="list">
            <h4 class="title"> Danh Sách Đơn Hàng </h4>
            <table class="table">         
               <thead class="thead-dark">          
               <th class="stt"> STT </th>
               <th class="name-product">Name </th>
                        <th> Tổng Tiền  </th>
                        <th> Thời Gian </th>
                        <th> ACTISON </th>
               </thead>
               <tbody>
               ${order.map((item,index) =>{
                  console.log(item);
                           return`
                           <tr>
                              <td> ${index+1} </td>
                              <td> ${item.nameKh} </td>
                              <td>${item.totalmoney} VND </td>
                              <td>${item.time}</td>
                              <td> 
                                 <button><a href="/#/orderdetail/${item._id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="45" fill="blue" class="bi bi-pencil-square repair" viewBox="0 0 16 16">
                                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                       </svg>    
                                 </a></button>
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
               
               </tbody>
               </table>
         </div>
       </div>
        `
    },
    async afterRender(){
            const btns = document.querySelectorAll('#remove');
            btns.forEach(btn=>{
                  let id = btn.dataset.id;
                  btn.addEventListener('click',async function(){
                     const question  = confirm ('bạn có muốn xóa hóa đơn');
                     if(question){
                           await  orders.remove(id);
                           await  comeBack(listOrder,'.content-main')
                     }
                  })
            })
    }
}
export default listOrder;