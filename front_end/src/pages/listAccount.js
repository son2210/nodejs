import saibarMenuAdmin from '../components/saibarMenuAdmin.js';
import accountApi from '../api/accountApi.js';
import {$, comeBack} from './untils';
import  swal from 'sweetalert'
const Account = {
    async render(){  
        try {
            const {data:user} =  await accountApi.getAll();
            return `
            <div class="bluer">
            <div class="container-fulid admin">
                   ${await saibarMenuAdmin.render()}
                   <div class="list">
                   <h4 class="title"> Danh Sách Tài Khoản  </h4>
                    <table class="table">
                        <thead class="thead-dark">
                            <th class="stt">STT </th>
                            <th class="name-product">Name </th>
                            <th>Emai </th>
                            <th> ACTION </th>
                        </thead>
                        <tbody> 
                        ${user.map((account,index) =>{ 
                            return `
                            <tr> 
                                <th class="stt">${index+1} </th>
                                <td> ${account.name} </td>
                                <td> ${account.email} </td>
                                <td class="action">
                                <button class="icon repair">
                                    <a href="/#/account/${account._id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor"
                                            class="bi bi-arrow-up-left-square" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.096 8.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707l4.096 4.096z" />
                                        </svg>
                                    </a>
                                </button>
                                    <button class="icon delete" id="remove" data-id="${account._id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor"
                                            class="bi bi-trash" viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
    
                                </td>
                            </tr>
                            `
                        }).join('')}
                        </tbody>
                    </table>
                   </div>
            </div>
        </div>
    `
            
        } catch (error) {
            swal({
                title: error.response,
                icon: "warning",
                button: "ok"
            });
            window.location.hash ="/admin"
        }
       
    },
    async afterRender() {
        const btns = document.querySelectorAll('#remove');
       await btns.forEach(btn =>{
            const id = btn.dataset.id
            btn.addEventListener('click',async function(){
                const  question = confirm ('Do you want delete the user ?');
                if(question){
                    try {
                      let {data} =  await accountApi.remove(id);
                      console.log(data);
                    } catch (err) {
                            console.log("sai" +  err.response);
                    }
                

                   await comeBack(Account,'.content-main')
                //    window.location.hash = "/account"
                }
                  
            })
        })
    }
}
export default Account;