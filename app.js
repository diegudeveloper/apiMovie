const cargarPelicula = async () => {
    
    try {
        const respuesta = await fetch ("http://api.themoviedb.org/3/movie/popular?api_key=70cd2641c242096a334e9fbbf541e90c&language=es-ES")
        
        console.log(respuesta);

        if (respuesta.status === 200) {
            const data = await respuesta.json();
            console.log(data.results);

            let peliculas = "";

            data.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            document.getElementById("contenedor").innerHTML = peliculas;
            
        } else if (respuesta.status === 401){
            console.log("Existe un error de autenticacion")
        } else if (respuesta.status === 404) {
            console.log("La Solicitud que requiere no se encuentra en nuestra base de datos")
        } else {
            console.log ("Hubo un error desconocido")
        }

    } catch (error) {
        console.log(error)
    }
    

}

cargarPelicula()