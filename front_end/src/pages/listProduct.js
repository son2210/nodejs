 import  ProductApi from '../api/productApi.js';
 import category from '../api/categories.js'
 import  saibarMenuAdmin  from '../components/saibarMenuAdmin.js';
 import {$, comeBack} from './untils';
const ListProduct={
   async  render() {
      const { data :product} = await  ProductApi.getAll();
      const {data:cate}= await  category.getAll()
   // console.log(product);
   //   let a= product.forEach(item =>{
   //     a  = item.categoryId
   //    })
   //    console.log(a);
      
      return `
      
      <div class="bluer">
         <div class="container-fulid admin">
         ${await saibarMenuAdmin.render()}
               <div class="list">
               <h4 class="title"> Danh Sách Sản Phẩm  <a href="/#/addproduct"> + </a>   </h4>
                  <table class="table" >
                     <thead class="thead">
                        <th class="stt">STT </th>
                        <th >NAME </th>
                        <th class="image">HÌNH ẢNH </th>
                        <th>DANH MỤC </th>
                        <th>GIÁ </th>
                        <th>SỐ LƯỢNG </th>
                        <th> ACTION </th>
                     </thead>
                     <tbody>

                        ${product.map( (product, index) =>{
                              return `
                              <tr>
                                 <th>${index+1} </th>
                                 <td>${product.name}</td>
                                 <td> <img src="http://localhost:4000/api/products/readPhoto/${product._id}" alt=""> </td>
                                 <td>${cate.find(abc => abc._id === product.categoryId).name}</td>
                                 <td>${product.price}</td>
                                 <td>50000</td>
                                 <td class="action">
                                    <button class="icon repair">
                                    <a href="/#/updateproduct/${product._id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor"
                                        class="bi bi-arrow-up-left-square" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.096 8.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707l4.096 4.096z" />
                                    </svg>
                                </a>
                                    </button>
                                    <button class="icon delete"  id="remove" data-id="${product._id}">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
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
   </div>
`
         }, 
   async afterRender(){
      const btns = document.querySelectorAll('#remove');
      btns.forEach(btn =>{
         const  id = btn.dataset.id;
            btn.addEventListener('click',async function(){
               const qusetion = confirm(' Do you want to delete the product ? ');
               if(qusetion){
                await  ProductApi.remove(id);
                await comeBack(ListProduct, '.content-main')
               }
              
            })
      })
   }
}
export default ListProduct;