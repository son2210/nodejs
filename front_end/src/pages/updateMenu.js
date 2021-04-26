import saibarMenuAdmin from "../components/saibarMenuAdmin";
import category from '../api/categories.js';
import {ParesRequestURl,$, comeBack} from './untils';
import species from '../api/species.js'
const updateMenu={
    async  render(){
        const {id}= await ParesRequestURl();
        const {data:cate}=  await category.get(id);
        const {data:specieDetails}= await species.get(cate.speciesId);
        const {data:specie}= await species.getAll();
        // console.log('xinn chào');
        return `
        <div class="bluer">
             <div class="container-fulid admin">
                 ${ await saibarMenuAdmin.render()}
                 <div class="list">
                 <h4 class="title"> Cập Nhật   </h4>
                    <div class="from">
                    <form action="" class="form-updateCate">
                        <div class="from-grup">
                            <label for=""> Tên danh mục</label>
                           <input type="text" id="nameCate" value="${cate.name}">
                        </div>
                        <div class="from-grup">
                            <label for=""> Shop Cưng (specieID)
                                <select name="giong" id="giong" riqure>
                                <option value="${specieDetails._id}"> ${specieDetails.name} </option>
                                ${specie.map(specie => {
                                    return `
                                                <option value="${specie._id}"> ${specie.name} </option>
                                                `
                                }).join('')}
                                </select>
                            </label>
                        </div>
                        <div class="from-grup">
                        <button type="submit" class="btn btn-primary"> Cập Nhật   </button>
                      </div>
                        </form>   
                    </div>  
                </div>  
            </div>  
        </div>  
        `
    },
   async afterRender(){
         const {id}=  ParesRequestURl();
                $('.form-updateCate').addEventListener('submit',async e=>{
                    e.preventDefault();
                    console.log("chạy đi");
                    const update={
                        name: $('#nameCate').value,
                        speciesId :$('#giong').value,
                    }
                    await  category.update(id, update)
                    // await comeBack(updateMenu,'#content-account')
                    window.location.hash ="/listcatetogory"
                    console.log(update);
                })
    }
}
export default  updateMenu;