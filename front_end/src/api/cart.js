import axiosClient  from './axiosClient'
const cart ={
    add(data){
        const url = `/cart`;
        return axiosClient.post(url,data )
    },
    getAll(){
        const url = `/cart`
        return axiosClient.get(url)
    },
    update(id,data){
        const url = `/cart/${id}`;
        return axiosClient.put(url,data)
    },
    remove(id){
        const url = `/cart/${id}`;
        return axiosClient.delete(url)
    }

}
export default  cart