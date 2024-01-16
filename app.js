let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior")
const btnSiguiente = document.getElementById("btnSiguiente")

btnSiguiente.addEventListener("click", () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPelicula();
    }
})

btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPelicula();
    }
})

const cargarBanner = async () => {
    
    try {
        const respuestaBanner = await fetch("http://api.themoviedb.org/3/movie/popular?api_key=70cd2641c242096a334e9fbbf541e90c&language=es-ES");
        
        console.log(respuestaBanner);

        if (respuestaBanner.status === 200) {
            const dataBanner = await respuestaBanner.json();
            console.log(dataBanner.results);

            const indiceAleatorio = Math.floor(Math.random() * dataBanner.results.length);
            const banner = dataBanner.results[indiceAleatorio];

            const peliculaBanner = `
                <div class="heroImage">
                    <img src="https://image.tmdb.org/t/p/w500/${banner.backdrop_path}">
                    <div class="capa"></div>
                    <div class="containerHero">
                        <div class="textHero">
                            <h2 class="titleBanner">${banner.title}</h2>
                            <p class="textOverview">${banner.overview}</p>
                            <div class="btnPelis">
                               <button>Ver Peli</button>
                               <button>Ver Triller</button>
                            </div> 
                        </div>
                        <div class="imgPoster">
                            <img clas="imgPoster_img" src="https://image.tmdb.org/t/p/w500/${banner.backdrop_path}">
                        </div>
                    </div> 
                </div>
            `;

            document.querySelector(".hero").innerHTML = peliculaBanner;
            
        } else if (respuestaBanner.status === 401) {
            console.log("Existe un error de autenticación");
        } else if (respuestaBanner.status === 404) {
            console.log("La solicitud que requiere no se encuentra en nuestra base de datos");
        } else {
            console.log("Hubo un error desconocido");
        }

    } catch (error) {
        console.log(error);
    }

}

cargarBanner();




//carga de las peliculas

const cargarPelicula = async () => {
    
    try {
        const respuesta = await fetch (`http://api.themoviedb.org/3/movie/popular?api_key=70cd2641c242096a334e9fbbf541e90c&language=es-ES&page=${pagina}`)
        
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