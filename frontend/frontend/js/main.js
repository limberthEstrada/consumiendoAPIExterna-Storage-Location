function miCalificacion(id)
{
  if(localStorage.getItem("datos")!==null)
  {
    let arrayDeDatos = localStorage.getItem("datos").split(","); //conversión a vector
    arrayDeDatos.push(id)

    localStorage.setItem("datos", arrayDeDatos)
  }
  else{
    let array = [];
    array.push(id)
    localStorage.setItem("datos", array)
  }

  //pa que se agregue el boton apenas hace click
  let parrafoFav = document.querySelector("#favoritas")
  parrafoFav.innerHTML = '<button><a href="favoritas.html">Favoritas</a></button>'
}

function favorita(id)
{
  return '<div class="ec-stars-wrapper">'+`<a href="#" onclick="miCalificacion(${id})">&#9733;</a>`+ '</div>'
}

window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);


//Pa sacar el boton de favoritas en caso de que no haya nada en localStorage
let datosLocal = localStorage.getItem("datos")
let parrafoFav = document.querySelector("#favoritas")
if(datosLocal !== null)
{
  parrafoFav.innerHTML = '<button><a href="favoritas.html">Favoritas</a></button>'
}


  // Aqui debemos agregar nuestro fetch
  fetch("http://localhost:3031/api/movies/")
  .then(response => response.json())
  .then(peliculas => {
    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("a");
      
      card.setAttribute("class", "card");
      card.setAttribute("href", `formulario.html?idPeli=${movie.id}`);

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;


//Acá voy a a crear la estrella
      const estrella = document.createElement("p")
      estrella.innerHTML = this.favorita(movie.id)

      container.appendChild(card);
      //container.appendChild(enlace);
      //enlace.appendChild(card)
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(estrella)

    });
  });



 
};
