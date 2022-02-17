window.onload = () => {
    let title = document.querySelector("#title")
    let rating = document.querySelector("#rating")
    let awards = document.querySelector("#awards")
    let release_date = document.querySelector("#release_date")
    let length = document.querySelector("#length")
    let botonAgregar = document.querySelector(".botonAgregar")
    let botonModificar = document.querySelector(".botonModificar")
    let botonEliminar = document.querySelector(".botonBorrar")

    //Recuperando datos de la URL
    let queryString = new URLSearchParams(location.search)
    let idRec = queryString.get("idPeli")

    //Lectura de una pelicula
    fetch(`http://localhost:3031/api/movies/${idRec}`)
    .then(function(res)
    {
        return res.json()
    })
    .then(function(pelicula)
    {
        console.log(pelicula.data)
        let fecha = new Date(pelicula.data.release_date)

        title.value = pelicula.data.title
        rating.value = Number(pelicula.data.rating)
        awards.value = Number(pelicula.data.awards)
        release_date.value = fecha.toISOString().slice(0,10)
        length.value = Number(pelicula.data.length)
    })
    .catch(err => {
        console.log(err)
    })



    //Creación
    botonAgregar.addEventListener("click", function()
    {
        let loQueIngresoElUsuario = {
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value,
            genre_id: 4
        }

        fetch("http://localhost:3031/api/movies/create", {
        method: "POST",
        body: JSON.stringify(loQueIngresoElUsuario),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "*/*"
        }
    })
    .then(res => {
        res.json()
    })
    .then(data =>
        {
            console.log(data)
        })
    })
    
    
    //Modificación
    botonModificar.addEventListener("click", function()
    {
        let loQueIngresoElUsuario = {
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value,
            genre_id: 4
        }
        fetch("http://localhost:3031/api/movies/update/55", {
        method: "PUT",
        body: JSON.stringify(loQueIngresoElUsuario),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "*/*"
        }
    })
    })
    

    //Eliminación
    botonEliminar.addEventListener("click", function()
    {
    fetch("http://localhost:3031/api/movies/delete/55", {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "*/*"
        }
    })
    })
    
}