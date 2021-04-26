import  axiosClient from './axiosClient.js'
import account from '../localstoget/index'
let acc = account.getId()
 const species ={
    getAll(){
        const  url = '/species';
        return  axiosClient.get(url)
    },
    get(id){
        const url = `/species/${id}`;
        return axiosClient.get(url)
    },
    add(data){
        const url = `/species/${acc.user._id}`;
        return axiosClient.post(url,data,{ headers: {"Authorization" : `Bearer ${acc.token}`}} )
    }
}
export default species;