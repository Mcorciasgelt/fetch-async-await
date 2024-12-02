// hacer un fetch de https://pokeapi.co/api/v2/pokemon
    // para detalles hacer https://pokeapi.co/api/v2/pokemon/${name}
    // async / await

// paginación de pokemon de 10 en 10
    // consejo: `?limit=`
    // ?offset=20&limit=20

// lógica para la búsqueda por nombre en el input
    // Si no exite deberá aparecer un mensaje de "pokemon no encontrado"
    // documentación para buscar por nombre aqui: `https://pokeapi.co/docs/v2`

// Maneja eventos de botones y actualiza dinámicamente la interfaz.


const divApp = document.getElementById("app")
let offsetActual = 0
const botonAnterior = document.getElementById("prevBtn")
const botonSiguiente = document.getElementById("nextBtn")
const botonReset = document.getElementById("resetBtn")
const inputSearch = document.getElementById("searchInput")
const botonSearch = document.getElementById("searchBtn")


// PRIMERA FUNCIÓN QUE LLAMA A LA API INICIAL PARA OBTENER EL LISTADO DE LOS POKEMONS SEGÚN LA PAGINACIÓN 
// (TODAVÍA NO HICE LO DE PAGINACIÓN, PERO FUI PONIENDO ESA VARIABLE POR PROBAR)
    const getPokemon = async (paginacion, limite) => {

        try {

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${paginacion}&limit=${limite}`)
            if (!response.ok) {
                throw new Error ("Ha surgido un error con la llamada API", response.status)            
            }
            const data = await response.json()
            const array = data.results
            return array
            
        } catch (error) {
            console.log("Error CATCH LISTADO al obtener los datos", error)
        }
        
    }

    console.log(getPokemon())

// SEGUNDA FUNCIÓN, CON EL RESULTADO DE LA ANTERIOR (QUE ES UN ARRAY) VA A USAR PROMISE.ALL PARA ESPERAR A QUE TODAS LAS PROMESAS SE RESUELVAN
// CADA UNA DE LAS PROMESAS SUCEDE EN EL MAP (YO ESTABA INTENTADO UN FOREACH PERO LUEGO LEÍ QUE EL FOREACH NO MANEJA PROMESAS)
    const getDetallesPokemons = async (listaPokemons) => {

        try {

            const detallesPokemons = await Promise.all(
                listaPokemons.map(pokemon => fetch(pokemon.url).then(res => res.json()))
            )
            
            return detallesPokemons
            
        } catch (error) {
            console.log("Error CATCH DETALLES al obtener los datos", error)
        }
        
    }    

    

// UNA VEZ QUE YA TIENE CREADO EL NUEVO ARRAY (DE LA FUNCIÓN ANTERIOR) CON EL JSON DE CADA URL DETALLE DE POKEMON, LOS PINTA EN EL DOM

    const template = (pokemons) => {

    pokemons.forEach((element) => {
        divApp.innerHTML +=
        `
        <div class="fichaPokemon">
            <img src="${element.sprites.other.dream_world.front_default}" alt="imagen pokemon ${element.name}">
            <p class="nombrePokemon">${element.name}</p>
        </div>

        ` 
    })

    }

    botonSiguiente.addEventListener("click", () => {
        offsetActual += 10
        cargarLista(offsetActual,10)
    })

    botonAnterior.addEventListener("click", () => {
        if (offsetActual > 0) {
            offsetActual -= 10
        cargarLista(offsetActual,10)}
    })

    botonReset.addEventListener("click", () => {
        inputSearch.value=""
        offsetActual=0
        cargarLista(offsetActual,10)
    })


    botonSearch.addEventListener("click", () => {
        inputArreglado = inputSearch.value
        inputArreglado = inputArreglado.toLowerCase()
        getPokemon(0,-1)
            .then((listado) => {
                const pokemonBuscado = listado.filter((pokemon) => pokemon.name == inputArreglado)
                console.log(pokemonBuscado)
        
        if(pokemonBuscado.length == 0) {
 
            divApp.innerHTML="<p>POKEMON NO ENCONTRADO</p>"
        }
        else {
        divApp.innerHTML=""
        getDetallesPokemons(pokemonBuscado).then((detalles) => template(detalles))
        }
            
        })
        .catch ((error) => {
            console.log(error)
        })
        
    })


// CON ESTO CREAMOS UNA FUNCIÓN CON EL OFFSET Y VAMOS LLAMANDO A CADA FUNCIÓN Y DECIMOS QUE USARÁ COMO PARÁMETRO EN LA SIGUIENTE FUNCIÓN
    const cargarLista = (offset) => {

        divApp.innerHTML=""
        getPokemon(offset,10).then((listado) => getDetallesPokemons(listado).then((detalles) => template(detalles)))

    }

cargarLista(offsetActual)