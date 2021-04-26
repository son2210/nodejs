
import  header  from './components/header.js';
document.querySelector('.header').innerHTML  = header.headerPage();
header.afterRender()
// import seachPage from './components/seachPage.js'; // tim kiếm 
import  addGiohang from './components/addGiohang';
// addGiohang.updategiohang();
import homepage from './pages/homePage.js';
import { ParesRequestURl, $ } from './pages/untils.js';
import ProductDetailPage from './pages/ProductDetail.js';
import err404 from './pages/error404Page.js';
import  speciesPage  from './pages/speciesPage.js';
import productCategory  from './pages/productDategory.js';
import registration from './pages/registration.js'; // đăng ký
import login  from './pages/login.js'
import adminPage  from './pages/adminPage.js';
import ListProduct from './pages/listProduct.js'; // danh sách sản phẩm
import Account from './pages/listAccount.js'
import store from './pages/myStore.js';
import updateAccount  from './pages/updateAccount.js'
import  addProduct  from './pages/addProduct.js';
import  addAccount from './pages/addAccount.js'
import listSlieShow from './pages/listSlieShow.js';
import listCatetogory from './pages/listCatetogory.js'; // danh sách các danh mục 
import addSlide from './pages/addSlide.js'; // thêm slide 
import updateMenu from './pages/updateMenu.js'; // update danh mục 
import Cart from './pages/addOrder.js' // giỏ hàng cart
import listOrder from './pages/listOrder.js' // danh sách hóa đơn
import orderDetail from './pages/orderDetailPage.js';
// $('.menu-user').innerHTML = taikhoan.render();
import addmenu from './pages/addmenuPage.js';
// import  saecho from './components/seachPage.js';
import addCart from './components/addCart.js'; //  thêm vào giỏ hàng vào
import  listCommet from './pages/listComment.js';
 import contact from './pages/contactPage.js';
 import listContacts from './pages/listContact.js'; // danh sách phản hồi
import updateProduct from './pages/updateProductPage.js';
import testUplaod from './pages/testUplaod.js';
import  updatestore from  './pages/updatestore.js'
import  updatebaner from './pages/updateSlide'
import comentdetail from './pages/comentdetail.js'
const routes = {
    '/': homepage,
    '/products/:id': ProductDetailPage,
    '/species/:id': speciesPage,
    '/categories/:id': productCategory,
    '/registration': registration,
    '/login': login,
    '/admin': adminPage,
    '/listproduct': ListProduct,
    '/listcatetogory':listCatetogory, // danh mục 
    '/order':listOrder, // giohang
    '/cart' :Cart, // giỏ hàng 
    '/account': Account,
    '/store': store,
    '/orderdetail/:id': orderDetail, // hóa đơn chi tiết
    '/account/:id': updateAccount, /// cập nhật tài khoản 
    '/addproduct': addProduct, // thêm sản phẩm 
    '/addaccount': addAccount, // thêm tài khoản 
    '/sileshow': listSlieShow, // sile showw
    '/addslide':addSlide, // thêm slider
    '/updatemenu/:id':updateMenu,//sửa menu 
    '/addmenu' :addmenu,
    '/comment' :listCommet, // ds bình luận 
    '/contact' : contact, // liên hệ 
    '/opinion' : listContacts,
    '/updateproduct/:id' :updateProduct,
    '/updatestore/:id' :updatestore,
    '/updatebaner/:id' :updatebaner,
    '/testuplaod' :testUplaod,
    '/comentdetail/:id' :comentdetail,

}

const router = async () => {
    const { recource, id, action } = ParesRequestURl();
    const praseUrl = (recource ? `/${recource}` : '/') + (id ? '/:id' : '');
    const page = routes[praseUrl] ? routes[praseUrl] : err404;

    $('.content-main').innerHTML = await page.render();

    if (page.afterRender) {
        await page.afterRender();
    }
    // if(addCart.updateToCartDisplay){
    //     await addCart.updateToCartDisplay();
    // }
    if(addGiohang.updategiohang){
        await addGiohang.updategiohang();
    }
    // ProductDetailPage.valedateComent();
}

window.scrollTo(0,0)
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
