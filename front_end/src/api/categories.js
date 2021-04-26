import axiosClient from './axiosClient.js';
import user from '../localstoget';
let acc = user.getId();
/*/ acc là object {
                token , user
} */
 const category ={
    getAll(ofset,soluong){
        const url =`/categorys?page=${ofset}&limit=${soluong}`
        return axiosClient.get(url)
    },
    get(id){
        const url = `/categorys/${id}`; // lấy chi tiết 1 cái j đó 
        return axiosClient.get(url)
    },
    add(data){ // thêm 
        const url = `/categorys/${acc.user._id}`;
        return axiosClient.post(url,data,{ headers: {"Authorization" : `Bearer ${acc.token}`} })
    },
    remove(id){ // xóa 
        const url = `/categorys/${acc.user._id}/${id}`;
        return axiosClient.delete(url,{ headers: {"Authorization" : `Bearer ${acc.token}`} })
    },
    update(id,data){ // cập nhật 
        const url = `/categorys/${acc.user._id} /${id}`;
        return axiosClient.put(url,data,{ headers: {"Authorization" : `Bearer ${acc.token}`} })
    }
}
export default  category