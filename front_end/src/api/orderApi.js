import axiosClient from './axiosClient.js';
 const orders={
    getAll(){
        const url=`/order`
        return  axiosClient.get(url)
    },
    get(id){
        const url=`/order/${id}`
        return  axiosClient.get(url)
    },
    add(order){
        const url=`/order/` //thêm vào
        return  axiosClient.post(url,order)
    },
    remove(id){ // xóa
        console.log(id);
        const url=`/order/${id}`
        return axiosClient.delete(url)
    },
    update(id,data){
        const urt=`/order/${id}`
        return axiosClient.put(url,data)   
    }
}
export default orders