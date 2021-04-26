import species from '../api/species.js';
import saibarMenuAdmin from '../components/saibarMenuAdmin.js';
import {$,comeBack} from './untils.js'
import category from '../api/categories.js';
const  addmenu={
    async render(){
        const {data:specie} = await species.getAll();
        return `
        <div class="bluer">
            <div class="container-fulid admin">
            ${await saibarMenuAdmin.render()}
           <div class="list">
           <h4 class="title"> Thêm Menu </h4>
            <div class="from">
         
                    <form action="" class="form-addMenu">
                      
                        <div class="from-grup">
                            <label for=""> Name  </label> 
                            <input type="text" class="nameMenu" placeholder="name menu">
                        </div>
                        <div class="from-grup">
                            <label for="inputState">Loại</label>
                                    <select id="loai" class="chon">
                                    <option  value="">Loại...</option>
                                    ${specie.map(item=>{
                                        return `
                                        <option value="${item._id}">${item.name}</option>
                                        `
                                    }).join(' ')}
                                
                            </select>
                        </div>
                        <div class="from-grup"> 
                             <button type="submit" class="btn btn-danger"> Thêm Menu  </button>
                        </div>
                    
                    </form>   
           </div>
        </div>  
    </div>  
  `
    },
    async afterRender(){
        document.querySelector('.form-addMenu').addEventListener('submit',async e=>{
            e.preventDefault();
            const nameMenu= $('.nameMenu');
            const loai = $('.chon');
            if(nameMenu.value ==""){
                nameMenu.focus();
                nameMenu.classList.add('err');
                return false;
            }
            nameMenu.classList.remove('err');
            if(loai.value ==""){
                loai.focus();
                loai.classList.add('err')
                return false;

            }
            const newMenu={
                name:nameMenu.value,
                speciesId :loai.value
            }
            await  category.add(newMenu);
            await  comeBack (addmenu , '#content-main')
            window.location.hash ="/listcatetogory"
        })
    }
}
export  default  addmenu;