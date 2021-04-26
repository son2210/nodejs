import category from '.././api/categories'
import listBanner from '../components/slideShow';
import  product  from '.././api/productApi'
const homepage = {
    async render() {
        const {data :categories} = await category.getAll();
        const {data:  productNew} = await  product.getAll(1,4);   
        return `
        ${await listBanner.render()}
        <h2> Sản Phẩm Mới Nhất</h2>
        <div class="row">
                           ${productNew.map( latest => {
                             return ` <div class="col-3 product">
                                       <a href="#/products/${latest._id}"> <img width="100%" src="http://localhost:4000/api/products/readPhoto/${latest._id}" alt=""></a>               
                                       <p class="name-product"> <a href="/#/products/${latest._id}">${latest.name}</a></p>
                                       <p class="price-product">  <a href="/#/products/${latest._id}"> Giá ${latest.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")} </a> </p>
                                       <button class="btn btn-primar addtoCart" data-id ="${latest.id}"> Thêm Vào Giỏ</button>
                                               </div>                             
                                           `
                             
                           }).join('')} 
                      
                </div> 
        `
    }
}
export default homepage
