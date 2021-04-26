import axiosClient from './axiosClient.js'
 import account from '../localstoget/index'
 let acc = account.getId() ;
//  console.log(acc.user._id);
const banner ={
    getAll(){
        const url = '/slides';
        return  axiosClient.get(url)
    },
    get(id){
        const url =`/slides/${id}`;
        return  axiosClient.get(url)
    },
    add(banner){
        const url = `/slides/${acc.user._id}`
        return axiosClient.post(url,banner,{ headers: {"Authorization" : `Bearer ${acc.token}`}})
    },
    remove(id){
        const url =`/slides/${acc.user._id}/${id}`;
        return  axiosClient.delete(url,{ headers: {"Authorization" : `Bearer ${acc.token}`}})
    },
    update(id , data){
        const url =`/slides/${acc.user._id}/${id}`;
        return  axiosClient.put(url, data , {headers: {"Authorization" : `Bearer ${acc.token}`}}) 
    }
}
export  default banner;