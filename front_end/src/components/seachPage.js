const seachPage={
   async  render(){
       document.querySelector('.form-search').addEventListener('submit',async function(e){
           e.preventDefault();
           console.log('đay là tìm kiếm ');
            await  this.search();
       })
      

    },
    async  search(){
        $('.content-main').innerHTML = 'đa là tìm keiems '
        return ` đay là tìm kiếm `
    }
}
export  default  seachPage;