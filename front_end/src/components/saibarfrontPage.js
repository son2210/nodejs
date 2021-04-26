import  category from '../api/categories'

const saibarFont={
 async   render(){
         const{data:cate} = await category.getAll();
        return`
        <div class="front-category">
            <h5 class="titel-category"> Danh Mục</h5>
                <ul class="menu-category">
                ${cate.map(item =>{
                    return `
                    <li><a href="/#/categories/${item._id}">${item.name} </a></li>
                    `

                }).join("") }
                </ul>
            <h5 class="titel-category"> Giá </h5>
                <form action="" class="">
                    <div class="seach-price">
                        <label for="">  Dưới 500  </label>
                        <input type="checkbox" value= " 50000">
                    </div>
                    <div class="seach-price">
                        <label for="">  Từ 500 -1Tr  </label>
                        <input type="checkbox" value= " 50000">
                    </div>
                    <div class="seach-price">
                        <label for="">  Từ 500 -1Tr  </label>
                        <input type="checkbox" value= " 50000">
                    </div>
                    <div class="seach-price">
                        <label for="">  Từ 1Tr -2tr  </label>
                        <input type="checkbox" value= " 50000">
                    </div>
                    <div class="seach-price">
                        <label for=""> Trên 5Tr </label>
                        <input type="checkbox" value= " 50000">
                    </div>
                </form>
    </div>
        `
    }
}
export default saibarFont