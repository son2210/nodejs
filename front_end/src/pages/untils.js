const ParesRequestURl = ()=>{
    const url  = document.location.hash.toLowerCase();
    const request = url.split('/')
    return {
        recource : request[1],
        id : request[2]
        
    }
}
const $ = selecter => {
    let element = document.querySelectorAll(selecter);
    return element.length ==1 ? element[0] : [...element]
}
const  comeBack =async (component,positon ="") =>{
    if(positon){
        $(positon).innerHTML = await component.render();
    }else{
        $('.content-main').innerHTML = await component.render();
    }
    await component.afterRender();
}
export {ParesRequestURl,$,comeBack};