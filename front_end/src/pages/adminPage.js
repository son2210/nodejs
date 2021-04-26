import saibarMenuAdmin from '../components/saibarMenuAdmin.js';
import { ParesRequestURl, $, comeBack } from '../pages/untils.js';
// import { listProduct } from './listProduct.js';
// import {listAccount} from './listAccount.js';
const adminPage = {
  async render() {
        return `
        <div class="bluer">
          <div class="container-fulid admin">
            ${await saibarMenuAdmin.render()}
          </div>
        </div>
        `

  },
  async afterRender() {

  }
}
export default adminPage;