import axios from 'axios'
import user from '../localstoget'  
// let acc = user.getId(); 
// let element = '';
// if(acc){

//     element = acc.token
//     return  element
// }else{
//     element = ''
// }
const axiosClient = axios.create({
    // baseURL :"http://localhost:3000",
    baseURL :"http://localhost:4000/api",
    headers :{
        'content-type':'application/json'
        
    },
})
export default axiosClient;
