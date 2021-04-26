import axiosClient from './axiosClient.js';
import user from '../localstoget';
let acc = user.getId();
 const accountApi = {
    getAll() {    
        const url = `/users/${acc.user._id}`;
        return axiosClient.get(url , { headers: {"Authorization" : `Bearer ${acc.token}`} } )// tất cả danh sách 
    },
    userComent() {    
        const url = `/userComent`;
        return axiosClient.get(url )// tất cả danh sách 
        
    },
    get(id) {
        const url = `/secret/${id}`;
        return axiosClient.get(url)
    },
    add(user){ // thêm tài khoản 
        const url = `/signup`
        return axiosClient.post(url,user)
    },
    remove(id){
        const url = `/user/${id}`;
        console.log(url);
        return axiosClient.delete(url )// xóa user cả danh sách 

    },
    update(id,data){
        const url = `/user/${id}`;
        return axiosClient.put(url,data)
    },
    signin(user){ // đăng nhập
        const  url = '/signin'
        return axiosClient.post(url, user)
    },
    signout(){
        const url = '/signout'
        return axiosClient.get(url)
    }
} 
export default  accountApi