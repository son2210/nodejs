import saibarMenuAdmin  from '../components/saibarMenuAdmin.js';
import { $, comeBack } from '../pages/untils.js';
import  banner  from '../api/slideshowApi.js';
// import { uploadFile } from '../firebase/index.js';
const addSlide={
    async render(){
        return `
        <div class="bluer">
             <div class="container-fulid admin">
                ${await saibarMenuAdmin.render()}
                <div class="list">
                <h4 class="title"> Thêm Slide </h4>
                    <div class="from ">
                            <form action="" class="form-addSlide"> 
                                <button type="submit" class="btn btn-primary">Thêm Tài Salide  </button>
                                <div class="from-grup">
                                    <label for="">Tên  </label>
                                    <input type="text" id="nameSlide" placeholder="Tên Slide">
                                </div>
                                <div class="from-grup">
                                    <label for=""> Ảnh</label>
                                    <input type="file" id="image"  required placeholder=" email">
                                </div>
                            </form>   
                        </div>  
                    </div>  
                </div>  
            </div>
        </div>
        `
    },
    async afterRender(){
        $('.form-addSlide').addEventListener('submit',async e=>{
            e.preventDefault();
            const nameSlide =$('#nameSlide');
            const imageSlide = $('#image').files[0];
                const formDetails  = new FormData();
                formDetails.append('photo',imageSlide)
                formDetails.append('name', nameSlide.value)
                try {
                  const {data} =  await banner.add(formDetails);
                  console.log(data);
                    if(data){
                        await comeBack(listSlieShow, '#content-main')
                    }else{
                        console.log(" thất bại ");
                    }
                } catch (error) {
                    console.log(error.response.data.err);
                }
        })
    }
}
export  default addSlide;