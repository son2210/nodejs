import axiosClient from './axiosClient.js'
import account from '../localstoget/index'
let acc = account.getId();
const ProductApi ={
    getAll(page , limit, asc){
        const url = `/products?page=${page}&limit=${limit}&order_by=${asc}`;
        return  axiosClient.get(url)
    },
    get(id){
        const url =`/products/${id}`;
        return  axiosClient.get(url)
    },
    add(product){
        const url = `/products/${acc.user._id} `
        return axiosClient.post(url,product ,{ headers: {"Authorization" : `Bearer ${acc.token}`} })
    },
    remove(id){
        const url =`/products/${acc.user._id}/${id}`;
        return  axiosClient.delete(url,{ headers: {"Authorization" : `Bearer ${acc.token}`} })
    },
    update(id, data) {
         const url = `/products/${acc.user._id}/${id}` 
         return  axiosClient.put(url,data,{ headers: {"Authorization" : `Bearer ${acc.token}`} })
    }
}
export  default ProductApi