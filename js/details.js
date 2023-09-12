fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then( (response) => response.json())
.then (data => {  
  let arrayEventos = data.events;
  const eventoAMostrar = arrayEventos.find(objetoEvento => objetoEvento._id == idBuscado);
  imprimirDetail(eventoAMostrar, contenedorDetails);
})
.catch( error => { console.log(error);})


const contenedorDetails = document.getElementById('contenedor-details');
const queryString = location.search;
const params = new URLSearchParams(queryString);
const idBuscado = params.get("id");

/* const eventoAMostrar = data.events.find(objetoEvento => objetoEvento._id == idBuscado); */

function crearEstructuraDetail(objetoEvento){
  let template = "";
  template = `
  <div class="row g-0" >
    <div class="col-md-6">
      <img src="${objetoEvento.image}" class="img-fluid rounded object-fit-cover w-100 h-100" alt="${objetoEvento.name}">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title text-center mb-3">${objetoEvento.name}</h5>
        <p class="card-text">${objetoEvento.description}</p>
        <p class="card-text"> Category: ${objetoEvento.category}</p>
        <p class="card-text">Date: ${objetoEvento.date}</p>
        <h5 class="card-title mb-3">$ ${objetoEvento.price}</h5>
        <p class="card-text">Place: ${objetoEvento.place}</small></p>
        <a href="./index.html" class="btn btn-primary">Home</a>
        </div>
    </div>
  </div>`
  return template;
}

function imprimirDetail(objetoEvento, elementoHtml){
  let estructura = crearEstructuraDetail(objetoEvento);
  elementoHtml.innerHTML = estructura;
}
