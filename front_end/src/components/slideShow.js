import  banner from '../api/slideshowApi'
const  listBanner = {
    async render(){
        const {data:item} = await  banner.getAll();
        return`            
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner banner">
                            <div class="carousel-item active">
                            <img width="150px" height="411"src="../../images/Slider-01.jpg" alt="">
                            </div>
                        ${item.map(element =>{
                            return `
                                <div class="carousel-item ">
                                <img  src= "http://localhost:4000/api/slides/readPhoto/${element._id} "class="d-block w-100" alt="${element.name}">
                                </div>
                            `
                           
                        }).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
            </div>
        `
    }
}
export default  listBanner