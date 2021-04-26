import axiosClient from "./axiosClient";

const contacts={
    getAll(){
        const url = '/feedback';
        return axiosClient.get(url)
    },
    get(id){
        const url = `/feedback/${id}`;
        return axiosClient.get(url)
    },
    add(data){
        const url = '/feedback';
        return axiosClient.post(url,data)
    },
    remove(id){
        const url = `/feedback/${id}`;
        return axiosClient.delete(url)
    },
}
export default contacts;