const cargarPelicula = async () => {
    
    try {
        const respuesta = await fetch ("http://api.themoviedb.org/3/movie/550?api_key=70cd2641c242096a334e9fbbf541e90c&language=es-ES")
        
        console.log(respuesta);

        if (respuesta.status === 200) {
            const data = await respuesta.json();
            console.log(data.title);
            
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