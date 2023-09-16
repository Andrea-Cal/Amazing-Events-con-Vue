// mostrar imagenes de eventos en el carousel
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

const { createApp } = Vue;

createApp({
  data() {
    return {
      // propiedades reactivas. (Lo que usemos en el HTML hay que declararlo aca)
      arrayEventos: [],
      categoriasSinRepetir: [],
      inputValue: "",
      eventosFiltrados: [],
      checkboxValues: [],
    }
  },  
  created(){
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then( (response) => response.json())
    .then (data => {  
      this.arrayEventos = data.events;      

      this.eventosFiltrados = this.arrayEventos;

      this.categoriasSinRepetir = [ ...new Set(this.arrayEventos.map(objetoEvento => objetoEvento.category))];      
    })
    .catch( error => { console.log(error);})
  },
  methods: {
    filtroBuscador(){    
      this.eventosFiltrados = this.arrayEventos.filter(objetoEvento => objetoEvento.name.toLowerCase().includes(this.inputValue.toLowerCase()));
    },    
    filtroCheckbox(){      
      if(this.checkboxValues.length > 0){
        this.eventosFiltrados = this.eventosFiltrados.filter(objetoEvento => this.checkboxValues.includes(objetoEvento.category));
      }  
    },    
  },
  computed: {
    filtroCombinado(){
      this.filtroBuscador();  
      this.filtroCheckbox();         
    },
  }
}).mount('#app')

