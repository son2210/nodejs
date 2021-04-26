import axiosClient from './axiosClient.js'
const test ={
    getAll(){
        const url = '/test';
        return  axiosClient.get(url)
    },
    get(id){
        const url =`/test/${id}`;
        return  axiosClient.get(url)
    },
    add(product){
        const url = `/test/`
        return axiosClient.post(url,product)
    },
    remove(id){
        const url =`/test/${id}`;
        return  axiosClient.delete(url)
    },
    latestproduct(){
        const url = '/test?_limit=4';
        return  axiosClient.get(url)
    }
}
export default test;