window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  let arrayFavoritas = localStorage.getItem("datos").split(",")

  arrayFavoritas.forEach(favorita =>
    {
      fetch(`http://localhost:3031/api/movies/${favorita}`)
      .then(function(respuesta)
      {
        return respuesta.json()
      })
      .then(function(pelicula)
      {
        console.log(pelicula)
        let data = pelicula.data;
          const card = document.createElement("div");
          card.setAttribute("class", "card");
    
          const h1 = document.createElement("h1");
          h1.textContent = data.title;
    
          const p = document.createElement("p");
          p.textContent = `Rating: ${data.rating}`;
    
          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${data.length}`;
    
          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          if (data.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Genero: ${data.genre.name}`;
            card.appendChild(genero);
          }
          card.appendChild(duracion);
          
      })
    })


  /** Codigo que debemos usar para mostrar los datos en el frontend
    
  */
};
