
import  admin from '../localstoget'
const saibarMenuAdmin = {
  async render() {
  let acc =  admin.getId();
    if (!acc) {
        alert('Không có quyền truy cập')
        window.location.hash = '/'
    } else {
        if (acc.user.role!= 1) {
          alert('Không phải quản trị ')
          window.location.hash = '#'
        } else {
          return `
            <div class="category">
                <h2> Danh Sách</h2>
                    <ul class="menu-admin">
                        <li><a href="/#/listproduct"> Sản Phẩm </a> </li>
                        <li><a href="/#/listcatetogory"> Danh Mục</a></li>
                        <li><a href="/#/store"> Cửa Hàng </a></li>
                        <li><a href="/#/sileshow">Slide Show</a></li>
                        <li><a href="/#/account"> Tài Khoản </a></li>
                        <li><a href="/#/order"> Đơn Hàng </a></li>
                        <li><a href="/#/comment"> Nhận Xét </a></li>
                        <li><a href="/#/opinion"> Phản Hồi </a></li>
                    </ul>
             </div>
          `

         }

    }
  }
}
export default saibarMenuAdmin;