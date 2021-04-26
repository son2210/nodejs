// import firebase  from '../firebase/index.js';
// // import uploadFile  from '../firebase/index.js';
// import species  from '../api/species.js';
// import { category } from '../api/categories.js';
// import { ParesRequestURl, $,comeBack } from './untils.js';
// // import { ProductApi } from '../api/productApi.js'
// import saibarMenuAdmin from '../components/saibarMenuAdmin.js';
// import swal from 'sweetalert';
// import test from '../api/testApi.js'
// const testUplaod={
//     async render(){
//         const {data:specie} = await species.getAll();
//         const {data:cate} = await category.getAll();
//         return  `
//         ${saibarMenuAdmin.render()}
//         <div class="form-add">
//         <form action="" class="form-addProduct" id="content-product">
//             <button type="submit" class="btn btn-primary">Thêm Sản Phẩm  </button>
//             <div class="form-grup">
//                 <label for=""> Tên Sản Phẩm <input type="text" id="namePro" placeholder="name product"></label>
//                 <span style="color:red" class="messeName"> </span>
//             </div>
//             <div class="form-grup">
//                 <label for=""> Ảnh Sản Phẩm <input type="file" id="imgPro" multiple="multiple" ></label>
//                 <span style="color:red" class="messerImg"> </span>
//             </div>
//             <div class="form-grup">
//                 <label for=""> Giá Sản Phẩm <input type="text" id="price" placeholder=" Price product"></label>
//                 <span style="color:red" class="mesesPrice"> </span>
//             </div>
//             <div class="form-grup">
//                 <label for=""> Độ Tuổi <input type="text" id="age" placeholder=" age product"></label>
//                 <span style="color:red" class="meseage"> </span>
                
//             </div>
//             <div class="form-grup">
//                 <label for=""> Số Lượng  <input type="text" id="quantity" placeholder="Số lượng "></label>
//                 <span style="color:red" class="mesesquantity"> </span>
//             </div>
//             <div class="form-grup malde">
//                 <label id="gioitinh" for=""> Giới Tính
//                     <input type="radio" name="checked" id="maidle" checked value="1"> Đực
//                     <input type="radio" name="checked" id="maidle" value="0"> Cái

//                 </label>
//             </div>
//             <div class="form-grup">
//                 <label for=""> Shop Cưng (specieID)
//                     <select name="giong" id="loai">
//                         <option value=""> Loài </option>
//                     ${specie.map(specie => {
//             return `
//                           <option value="${specie.id}"> ${specie.name} </option>
//                           `
//         }).join('')}
//                     </select>
//                 </label>
//                 <span style="color:red" class="messenspecie"> </span>
//             </div>
//             <div class="form-grup">
//                 <label for=""> Giống loại (categories)
//                     <select name="giong" id="giong">
//                         <option value=""> Loại Vật  </option>
//                        ${cate.map(category => {
//             return `
//                             <option value="${category.id}"> ${category.name} </option>
//                           `
//         }).join('')}
//                     </select>
//                 </label>
//                 <span style="color:red" class="messecategories"> </span>
//             </div>
//             <hr class="hrr">
//             <div class="form-grup">
//                 <h5>Đặc Điểm </h5>
               
//                 <div class="form-grup">
//                     <label for=""> Phần Đầu  </label> <br>
//                         <textarea name="" id="phandau" cols="80" rows="2"></textarea> 
//                         <span style="color:red" class="messephandau"> </span>                    
//                 </div>
//               <div  class="form-grup"> 
//                 <label for=""> Phần Giữa </label> <br>
//                     <textarea name="" id="phangiua" cols="80" rows="2"></textarea>
//                     <span style="color:red" class="messephagiua"> </span>
//               </div>
//                <div  class="form-grup">
//                 <label for=""> Bộ lông</label> <br>
//                     <textarea name="" id="bolong" cols="80" rows="2"></textarea>
//                     <span style="color:red" class="messebolong"> </span>
//                </div>

//             </div>
            
//         </form>
//     </div>
//     </div>
//     <div class="abc">
    
//     </div>
//     `
//     },
//     async afterRender(){
//         await this.vadelate();
//         const image = document.querySelector('#imgPro');
//         let anh= [];
//         document.querySelector('.form-addProduct').addEventListener('submit', async e=>{
//             e.preventDefault();
//         //     let gioitinh;
//         //     let maidle= document.querySelectorAll('#maidle');
//         //         for(let i=0;i<maidle.length;i++){
//         //             if(maidle[i].checked == true){
//         //                 gioitinh = maidle[i].value
//         //             }
//         //         }
//         //     let nameproduct = $('#namePro'); // tên sản phâm r
//         //     let categoryId= $('#giong') // giống loại 
//         //     let price = $('#price'); // giá 
//         //     let age = $('#age'); // độ tuổi 
//         //     let specieId = $('#loai'); // loại nào 
//         //     let phandau = $('#phandau') // đặc điểm  phần đầu 
//         //     let phangiua = $('#phangiua') // phần giữa 
//         //     let bolong = $('#bolong'); // bộ lông 
//         //     let TotalquantityProdcuct = $('#quantity'); // số lượng 
         
//         //     if(nameproduct.value ==""){
//         //         nameproduct.focus();
//         //         nameproduct.classList.add('error');
//         //         document.querySelector('.messeName').innerHTML =" Không được để trống "
//         //         return false;
//         //     }
//         //     nameproduct.classList.remove('error');
//         //     document.querySelector('.messeName').innerHTML =" "
//         //     // giá sản phẩm 
//         //     if(!Number(price.value)|| Number(price.value) <=0 ){
//         //         price.focus();
//         //         price.classList.add('error');
//         //         document.querySelector('.mesesPrice').innerHTML ="Vui lòng nhập số và lớn hơn 0"
               
//         //         return false;
//         //     }
//         //     document.querySelector('.mesesPrice').innerHTML =""
//         //     price.classList.remove('error');
//         //     // tuổi 
//         //     if(age.value =="" ){
//         //         age.focus();
//         //         age.classList.add('error');
//         //         document.querySelector('.meseage').innerHTML ="Không được để trống"
//         //         return false;
//         //     }
//         //     document.querySelector('.meseage').innerHTML =""
//         //     age.classList.remove('error');
//         //     //  số lượng 
//         //  if(!Number(TotalquantityProdcuct.value)|| Number(TotalquantityProdcuct.value) <=0 ){
//         //     TotalquantityProdcuct.focus();
//         //     TotalquantityProdcuct.classList.add('error');
//         //         document.querySelector('.mesesquantity').innerHTML ="Vui lòng nhập số và lớn hơn 0"
//         //         return false;
//         //     }
//         //     document.querySelector('.mesesquantity').innerHTML =""
//         //     price.classList.remove('error');
//         //     //  loại shop nào 
//         //     if(specieId.value ==""){
//         //         specieId.classList.add('error');
//         //         document.querySelector('.messenspecie').innerHTML = "không được để trống"
//         //         return false; 
//         //     }
//         //     specieId.classList.remove('error');
//         //     document.querySelector('.messenspecie').innerHTML = " "
      
//         //     // giống nào 
//         //     if(categoryId.value==""){
//         //         categoryId.focus();
//         //         categoryId.classList.add('error')
//         //         document.querySelector('.messecategories').innerHTML = " không được để trống "
//         //         return false; 
//         //     }
//         //     document.querySelector('.messecategories').innerHTML = " ";
//         //     categoryId.classList.remove('error')
//         //     //  phần đầu 
//         //         if(phandau.value==""){
//         //             phandau.focus();
//         //             phandau.classList.add('error');
//         //             document.querySelector('.messephandau').innerHTML = " không được để trống ";
//         //             return false ;
//         //         }
//         //         document.querySelector('.messephandau').innerHTML = "  ";
//         //         phandau.classList.remove('error');
                
//         //         if(phangiua.value==""){
//         //             phangiua.focus();
//         //             phangiua.classList.add('error');
//         //             document.querySelector('.messephagiua').innerHTML = " không được để trống ";
//         //             return false ;
//         //         }
//         //         document.querySelector('.messephagiua').innerHTML = "  ";
//         //         phangiua.classList.remove('error');
                
//         //         if(bolong.value==""){
//         //             bolong.focus();
//         //             bolong.classList.add('error');
//         //             document.querySelector('.messebolong').innerHTML = " không được để trống ";
//         //             return false 
//         //         }
//         //         document.querySelector('.messebolong').innerHTML = "  ";
//         //         bolong.classList.remove('error');
               
//             let productImage = image.files;
//         //     if(productImage.length<2){
//         //         console.log('đã sai rồi làm lại đi ');
//         //         image.classList.add('error');
//         //         document.querySelector('.messerImg').innerHTML = ' Không được dưới 2 ảnh  '
//         //         return false;
//         //     }else if(productImage.length>5){
//         //         console.log('lại sai rồi  ');
//         //         image.classList.add('error');
//         //         document.querySelector('.messerImg').innerHTML = ' Không được quá 5 ảnh  '
//         //         return false;
//         //     }
//         //     image.classList.remove('error');
//             // document.querySelector('.messerImg').innerHTML = ' '
//             // let productImage
//             for(let i =0 ;  i <productImage.length; i++){
//                 anh.push(productImage[i]);
//             }
//             let storageRef ;
//             let urlAnh =[];
//             anh.forEach(item=>{
//                   storageRef = firebase.storage().ref(`images/${item.name}`);
//                  storageRef.put(item).then(function(){
//                     return storageRef                  
//                  });
           
//                  storageRef.getDownloadURL().then((url)=>{
//                     urlAnh.push(url)
//                 //    return urlAnh
//                     const newProduct={
//                         image : urlAnh[0],
//                         name: 'sản phẩm 1',
//                         // chitietanh:imagedetail   
//                     }
//                     // console.log(newProduct.image);
                                  
//                 })
               
//             })
//             // console.log(urlAnh.length);
//             // let imagedetail=[];
//             // for(let i=1;i<urlAnh.length;i++){
//             //     imagedetail.push(urlAnh[i]);
//             //     console.log(imagedetail);
//             // }
//             const newProduct={
//                 // image : urlAnh[0],
//                 name: 'sản phẩm 1',
//                 chitietanh:urlAnh
//             }
        
//             console.log(newProduct.chitietanh)
//             let b ;
//             b = `
//             ${newProduct.chitietanh.forEach(item=>{
//                            return `
//                            <div> <img src="${item}"/> </div> `
//             })}
//                 `
//                document.querySelector('.abc').innerHTML = b
//               // const newProduct ={
//                 //     nameproduct:nameproduct.value,
//                 //     image:urlAnh[0],
//                 //     price:price.value,
//                 //     age:age.value,
//                 //     gioitinh:gioitinh,
//                 //     specieId:specieId.value,
//                 //     categoryId:categoryId.value,
//                 //     phandau:phandau.value,
//                 //     phangiua:phangiua.value,
//                 //     bolong :bolong.value,
//                 //     TotalquantityProdcuct:TotalquantityProdcuct.value,
//                 //     chitietanh:imagedetail
//                 // }
//                 // console.log(newProduct);
//           // let b ;
                  
//                     //     b = `
//                     //             <div> <img src="${newProduct.image}"/> ảnh chính  </div>
//                     //           ${  newProduct.chitietanh.map(item=>{
//                     //            return `
//                     //            <div> <img src="${item}"/> </div>
//                     //            `
//                     //           })}            
                                
//                     // `
//                     // document.querySelector('.abc').innerHTML = 

          
//         })
//     },
//     async vadelate(){
//         const image = document.querySelector('#imgPro');
//         image.addEventListener('change', await function(){
//             const productImage = image.files
//             if(productImage.length<2){
//                 console.log('đã sai rồi làm lại đi ');
//                 image.classList.add('error');
//                 document.querySelector('.messerImg').innerHTML = ' quá ít ảnh '
//                 return false;
//             }else if(productImage.length >5){
//                 console.log('lại sai rồi  ');
//                 image.classList.add('error');
//                 document.querySelector('.messerImg').innerHTML = ' quá nhiều ảnh  '
//                 return false;
//             }
//             image.classList.remove('error');
//             document.querySelector('.messerImg').innerHTML = ' '
//         })
//     }
// }
// export default testUplaod;