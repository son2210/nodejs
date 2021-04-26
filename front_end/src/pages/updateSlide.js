import {ParesRequestURl, $} from "./untils"
import saibarMenuAdmin  from '../components/saibarMenuAdmin'
import slide  from  '../api/slideshowApi'
const updatebaner = {
    async render(){
        const {id} = await ParesRequestURl();
        const {data:slider} = await slide.get(id)
        return `
            <div class="bluer">
                <div class="container-fulid admin">
                    ${ await saibarMenuAdmin.render()}
                    <div class="list">
                        <h4 class="title"> Cập Nhật   </h4>
                        <div class="from">
                            <form action="" class="update">
                                <div class="from-grup">
                                    <label for=""> Tên danh mục</label>
                                    <input type="text" id="name" value="${slider.name}">
                                </div>
                                <div class="from-grup">
                                    <label for=""> Tên danh mục</label>
                                    <input type="file" id="image" value=""> 
                                </div>
                                <div class="from-grup">
                                     <button type="submit" class="btn btn-primary"> Cập Nhật </button> 
                                </div>
                                <div class="from-grup">
                                     <img width="20%"  src="http://localhost:4000/api/slides/readPhoto/${slider._id}" />
                                </div>
                            </form>   
                        </div>
                    </div>
                </div>
            </div>
            `
    },
    async afterRender() {
        const {id} = await ParesRequestURl();
        const update = $('.update')
        update.addEventListener('submit', async e =>{
            e.preventDefault();
            console.log("ok");
            let name = $('#name').value;
            let image = $('#image').files[0];
            let formUpdate =  new FormData()
            formUpdate.append("name" , name)
            if(image){
                formUpdate.append("image" , image)
            }
            try {
                const {data} = await  slide.update(id,formUpdate)
              if(data){
                  window.location.hash = '/sileshow'
              }
            } catch (error) {
            console.log(error.response.data.err)
            }

        })
    }
}
export default  updatebaner