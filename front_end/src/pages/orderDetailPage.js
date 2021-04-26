import orders from '../api/orderApi.js';
import ProductApi from '../api/productApi.js'
import {ParesRequestURl ,$, comeBack} from './untils.js';
import saibarMenuAdmin from '../components/saibarMenuAdmin.js';

const  orderDetail={
    async render(){
        const {id} = await ParesRequestURl();
        const {data: order} = await orders.get(id); //order  object  
        const {data:productID} = await ProductApi.getAll();  
        let sanpham; 
        let  abc=[]; 
        return `
        ${await  saibarMenuAdmin.render()}
        <div class="content-Admin  col-10 ">
        <h3 style=" color:red;"> Chi Tiết  Đơn Hàng  </h3> <br>
            <table class="table table-striped table-m">   
            <h4> Thông Tin Khách Hàng  </h4> 
            <thead>         
            <tr>
                    <th> Name khách Hàng  </th>
                    <th> Tổng Tiền  </th>
                    <th> Thời Gian </th>
                    <th> Email  </th>
                    <th> Phone </th>
                    <th> Địa Chỉ </th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td> ${order.name} </td>
                    <td> ${order.totalmoney} VND </td>
                    <td> ${order.time} </td>
                    <td> ${order.email} </td>
                    <td> ${order.phone} </td>
                    <td> ${order.address} </td>
                </tr>
            </tbody>
        </table>
            <table class="table table-striped table-m">     
            <h4> Chi Tiết Sản Phẩm    </h4>          
            <thead>
            <tr>
                    <th> Name  </th>
                    <th> image  </th>
                    <th> Giá  </th>
                    <th> Số Lượng   </th>
                   
            </tr>
            </thead>
            <tbody class="abc">
                ${order.productId.map(async  item=>{
                       sanpham=productID.find(e =>e.id == item.idSP)
                          await abc.push(sanpham);
                    }).join('')}
                  ${abc.map(item =>{
                        return `
                               <tr>
                                       <td>${item.name}</td> 
                                       <td><img width="50px" src="${item.image}"/></td> 
                                       <td>${item.price}</td> 
                                       <td>${item.quantity}</td> 
                               </tr>
                           ` 
                        })
                }

            </tbody>
        </table>


     </div>
   `
    },
   
}
export  default orderDetail;