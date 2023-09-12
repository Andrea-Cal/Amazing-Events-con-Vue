fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then( (response) => response.json())
.then (data => {  
  let objetoData = data;
  let arrayEventos = data.events;
  // filtramos los eventos pasados
  let arrayDeEventosPasados = arrayEventos.filter(objetoEvento => objetoData.currentDate > objetoEvento.date); 
  // mostrar imagenes de eventos futuros en el carousel
  mostrarImagenesEnCarousel(arrayDeEventosPasados, carouselPast);
  // escuchador de eventos del input
  barraDeBusqueda.addEventListener("keyup", ()=> {
    const returnFiltrosCombinados = filtroCombinado(arrayDeEventosPasados, barraDeBusqueda);
    imprimirCardsEnHtml(returnFiltrosCombinados, cardsPast);
  });
  // filtra las categorias del array de eventos pasados sin repetir
  const categoriasSinRepetir = [ ...new Set(arrayDeEventosPasados.map(objeto => objeto.category))];
  // llamado a la funcion que imprime las categorias
  imprimirCategoriasEnHtml(categoriasSinRepetir, checkboxCategorias);
  // escuchador de eventos de los checkbox
  checkboxCategorias.addEventListener("change", (e)=> {   
    const returnFiltrosCombinados = filtroCombinado(arrayDeEventosPasados, barraDeBusqueda);  
    imprimirCardsEnHtml(returnFiltrosCombinados, cardsPast);  
  });
  // llamado a la funcion que imprime las cards
  imprimirCardsEnHtml(arrayDeEventosPasados, cardsPast);
})
.catch( error => { console.log(error);})

// contenedor carousel
const carouselPast = document.getElementById('carousel-past');
// contenedor cards
const cardsPast = document.getElementById('card-section-past');
// contenedor checkbox categorias
const checkboxCategorias = document.getElementById('checkbox-categorias');
// input del buscador
const barraDeBusqueda = document.querySelector('input[type=search]');

// mostrar imagenes de eventos pasados en el carousel
function mostrarImagenesEnCarousel(array, elementoHtml){
let templateCarousel = '';
for (let i = 0; i < array.length; i++) {  
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

// funcion que crea la estructura HTML de los checkbox
function crearEstructuraChecks(categoria){
  let templateCheckBox = "";
  templateCheckBox = `<label><input type="checkbox" id="${categoria}" name="cbox" value="${categoria}"/> ${categoria}</label>`;  
  return templateCheckBox;
}

// funcion que imprime las categorias
function imprimirCategoriasEnHtml(arrayDeCategorias, elementoHtml){
  let estructura = "";  
  arrayDeCategorias.forEach(categoria => {
    estructura += crearEstructuraChecks(categoria)
  });
  elementoHtml.innerHTML = estructura;
}

// funcion de filtro por checkbox
function filtroCheckbox(arrayDeEventos){
  let nodeList = document.querySelectorAll("input[type='checkbox']:checked");  
  let arrayValues = Array.from(nodeList).map(input => input.value);
  if(arrayValues.length > 0){
    let eventosFiltradosCheck = arrayDeEventos.filter(objetoEvento => arrayValues.includes(objetoEvento.category));
    return eventosFiltradosCheck;
  }else{
    return arrayDeEventos;
  }    
}

// Funcion normalizar input
function capitalizarPrimeraLetra(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

// funcion de filtro por barra de busqueda
function filtroBuscador(arrayDeEventos, input){  
  let inputNormalizado = capitalizarPrimeraLetra(input.value);
  let eventosFiltradosBusqueda = arrayDeEventos.filter(objetoEvento => objetoEvento.name.includes(inputNormalizado));
  return eventosFiltradosBusqueda;
}

// funcion de filtros combinados
function filtroCombinado(arrayDeEventos, input){
  const eventosFiltradosCheck = filtroCheckbox(arrayDeEventos);
  const resultadofiltroCombinado = filtroBuscador(eventosFiltradosCheck, input);  
  return resultadofiltroCombinado;
}

// funcion que crea la estructura HTML de las cards
function crearEstructuraCard(objetoEvento){
  let template = '';  
  template += `
  <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <img src="${objetoEvento.image}" class="card-img-top" alt="${objetoEvento.name}">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      </svg>         
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${objetoEvento.name}</h5>
      <p class="card-text">${objetoEvento.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">$ ${objetoEvento.price}</h5>
        <a href="./details.html?id=${objetoEvento._id}" class="btn btn-primary">Details</a>
      </div>          
    </div>
  </div>`;   
  return template;
}

// funcion que imprime las cards
function imprimirCardsEnHtml(arrayDeEventos, elementoHtml){
  let estructura = "";
  if(arrayDeEventos.length > 0){
    arrayDeEventos.forEach (objetoEvento => {
      estructura += crearEstructuraCard(objetoEvento)
    })
    elementoHtml.innerHTML = estructura;
  }else{
    imprimirMensajeBusquedaNoCoincide(elementoHtml);
  }  
}

// funcion que crea la estructura del mensaje
function crearEstructuraMensaje(){
  let template = `
    <div class="card text-center">
      <div class="card-header" id="mensaje-error">
        Search results
      </div>
      <div class="card-body">
        <h5 class="card-title">Ups!</h5>
        <p class="card-text">We did not find events that match your search. Please, try again.</p>
        <a href="./past_events.html" class="btn btn-primary">Go back</a>
      </div>  
    </div>`;
  return template;
}

// funcion que imprime el mensaje cuando los resultados de la busqueda no coinciden
function imprimirMensajeBusquedaNoCoincide(elementoHtml){ 
  let template = crearEstructuraMensaje();
  elementoHtml.innerHTML = template;
}







