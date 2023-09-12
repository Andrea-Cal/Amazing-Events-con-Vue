fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then( (response) => response.json())
.then (data => {  
  let arrayEventos = data.events;
  // llamado a la funcion que muestra imagenes en el carousel
  mostrarImagenesEnCarousel(arrayEventos, carouselContact);  
})
.catch( error => { console.log(error);})

// contenedor carousel
const carouselContact = document.getElementById('carousel-contact');

// mostrar imagenes de los primeros 3 eventos en el carousel
function mostrarImagenesEnCarousel(array, elementoHtml){
  let templateCarousel = '';
  for (let i = 0; i < 3; i++) {
    if(i === 0){
      templateCarousel += `
      <div class="carousel-item active">
        <img src="${array[i].image}" class="d-block w-100" alt="${array[i].name}">
      </div>`
    }else{
      templateCarousel += `
      <div class="carousel-item">
        <img src="${array[i].image}" class="d-block w-100" alt="${array[i].name}">
      </div>`
    }    
  }
  elementoHtml.innerHTML = templateCarousel;
}


