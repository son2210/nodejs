// import moduleName from 'module';
import banner from '../api/slideshowApi.js';
import saibarMenuAdmin from '../components/saibarMenuAdmin.js';
import {$, comeBack} from './untils';

const listSlieShow ={
    async render(){
        const {data:slider} = await  banner.getAll();
         return `
         <div class="bluer">
            <div class="container-fulid admin">
            ${await saibarMenuAdmin.render()}
           
            <div class="list">
            <h4 class="title"> Danh Sách Banner  <a href="/#/addslide"> + </a> </h4>
            <table class="table">
                <thead class="thead">
                    <th class="stt">STT </th>
                    <th >Name </th>
                    <th class="image">Hình Ảnh  </th>
                    <th>ACTION </th>
                </thead>
                <tbody> 
                ${slider.map( (item, index) => {
                return `
                <tr>
                <th class="stt" scope="row">${index+1} </th>
                <td>${item.name}</td>
                <td > <img width="150px" src= "http://localhost:4000/api/slides/readPhoto/${item._id}"  alt="" /> </td>
                <td class="action">
                    <button class="icon repair">
                        <a href="/#/updatebaner/${item._id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor"
                                class="bi bi-arrow-up-left-square" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.096 8.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707l4.096 4.096z" />
                            </svg>
                        </a>
                    </button>
                        <button class="icon delete" id="remove" data-id="${item._id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor"
                                class="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </button>

                    </td>
                    </tr>
                `
            }).join('') }
                    
                </tbody>
                </table>
            </div>
        </div>
    </div>
         `
      //   return `
      //       ${ await saibarMenuAdmin.render()}
      //       <div class="content-Admin col-10 ">
      //       <h3>Danh Sách Slide Show </h3> 
      //       <a href="#/addslide"> thêm slide </a>
      //       <table class="table">
      //          <thead>
      //             <tr>
      //                   <th scope="col"> STT </th>                 
      //                   <th scope="col"> name </th>      
      //                   <th scope="col"> Image </th>                              
      //                   <th scope="col"> ACTISON </th>
      //             </tr>
      //          </thead>
      //          <tbody>
             
      //          ${slider.map((slide, index) =>{
      //             return `
      //             <tr scope="row">
      //                <td> ${index+1} </td>
      //                <td> ${slide.name} </td>
      //                <td > <img width="150px" src= "http://localhost:4000/api/slides/readPhoto/${slide._id}"  alt="" /> </td>
      //                <td> 
      //                   <button><a href="">
      //                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="45" fill="blue" class="bi bi-pencil-square repair" viewBox="0 0 16 16">
      //                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      //                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      //                         </svg>    
      //                   </a></button>
      //                   <button  id="remove" data-id="${slide._id}">
      //                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="45" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
      //                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      //                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      //                         </svg>
      //                      </button>
      //                </td>
      //       </tr>
      //             `
      //          }).join('')}
                 
      //          </tbody>
      //       </table>
      //    </div>
      // </div>
      //       </div>
      //   `
    },
    async afterRender(){
        const btns = document.querySelectorAll('#remove')
        btns.forEach(btn=>{
            let id = btn.dataset.id
            btn.addEventListener('click',async function(){
                const qusetion = confirm(' Do you want to delete the slide ? ');
                if(qusetion){
                    await banner.remove(id);
                    await comeBack(listSlieShow, '.content-main')
                }
                
            })
        });
    }
}
export  default listSlieShow;