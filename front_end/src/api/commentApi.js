import axiosClient from './axiosClient.js';
const comment= {
    getAll(){
            const url = "/coment"
            return axiosClient.get(url)
    },
    add(data){
        const url ="/coment/"
        return axiosClient.post(url,data)
    },
    remove(id){ // xóa comentt
        const url =`/coment/${id}`
        return axiosClient.delete(url)
    }
}
export default  comment;