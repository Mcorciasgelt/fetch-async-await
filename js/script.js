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


const getPokemon = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
        if (!response.ok) {
            throw new Error ("Ha surgido un error con la llamada API", response.status)            
        }
        const data = await response.json()
        const array = data.results
        return array
        
    } catch (error) {
        console.log("Error CATCH al obtener los datos", error)
    }
    
}

console.log(getPokemon())

const template = (pokemons) => {

pokemons.forEach(element => {
    const idPokemos = pokemons.indexOf(element) + 1
    console.log(idPokemos);
    
    divApp.innerHTML +=
    `
    <div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemos}.svg" alt="imagen pokemon ${element.name}">
        <p>${element.name}</p>
    </div>
    
    `
});
  
}

getPokemon().then((pokemon) => template(pokemon))