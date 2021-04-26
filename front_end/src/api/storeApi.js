import axiosClient from './axiosClient.js';
  const stores ={
    getAll(){
        const url = '/store';
        return axiosClient.get(url)
    },
    get(id){
        const url = `/store/${id}`;
        return axiosClient.get(url)
    },
    update(id,store){   
        const url = `/store/${id} `;  
        return axiosClient.put(url,store)
    }
}
export default stores