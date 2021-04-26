import accountApi from '../api/accountApi'
const taikhoan = {
  async tk() {
    this.dangxuat()
    let acc = sessionStorage.getItem('user')
    acc = acc == null ? [] : JSON.parse(acc)
    // console.log(acc);
    let menuUser = ``;
    if (acc.length > 0) {
      acc.forEach(item => {
        if (item.user.role == 0) {
          menuUser += `
                    <li> ${item.user.name}
                        <ul class="sub-menu-user">
                          <li id="dangxuat"> Đăng Xuất</li>
                          <li><a href="#/"> Đơn Hàng  </a></li>
                          <li><a href="#/"> Lịch Sử  </a></li>
                        </ul>                   
                    </li>
                `
          return;
        } else {
          menuUser += `
                        <li> ${item.user.name}
                          <ul class="sub-menu-user">
                              <li id="dangxuat"> Đăng Xuất</li>
                              <li><a href="#/admin"> Admin</a></li>
                          </ul>
                        </li>
                    `
        }
      })
    } else {
      menuUser += `
                    <li><a href="#/registration"> Đăng ký</a></li>
                    <li><a href="#/login"> Đăng nhập </a></li>
                `
    }
    document.querySelector('.menu-user').innerHTML += menuUser
  },
  async dangxuat() {
    const logOut = document.querySelector('#dangxuat');
    if (logOut != null) {

      logOut.addEventListener('click', async e => {
        const { data: user } = await accountApi.signout()
        if (user) {
          await sessionStorage.removeItem('user');
          window.location.hash = '#';
          window.location.reload();
        } else {
          alert('Đăng Xuất Thất Bại !')
        }

      })
    }


  }
}
export default taikhoan