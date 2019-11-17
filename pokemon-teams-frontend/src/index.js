const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName("main")[0]

//to load server:
//backend: cd into backend and rails s
//frontend: cd into frontend in other tab and open index.html

//NOT FINISHED-went past hours

window.onload = () => {
    loadTrainers()
}

//load trainers with their team of pokemon
function loadTrainers() {
    fetch("http://localhost:3000/trainers")
    .then(function(response) {
      return response.json();
    })
    .then(function(trainers) {
      debugger;
      trainers.data.forEach( (trainer) => {
        //was getting error b/c needed to access .data-could see in console.log-bc of how api is set up
        //make card for each trainer and add to html
        main.innerHTML += createTrainerCard(trainer)
      })
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");
      console.log(error.message);
    });
}

// function loadPokemon(id) {
//   fetch(`http://localhost:3000/pokemons/${id}`)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(pokemon) {
//     createPokeLi(pokemon)
//   })
//   .catch(function(error) {
//     alert("Bad things! Ragnarők!");
//     console.log(error.message);
//   });
// }

function createTrainerCard(trainer) {
  const pokemonArray = trainer.relationships.pokemons.data
  return `
       <div class="card" id="trainer-${trainer.id}" data-id="${trainer.id}"><p>${trainer.attributes.name}</p>
           <button data-trainer-id="${trainer.id}">Add Pokemon</button>
           <ul>
            ${loadTeam(pokemonArray)}
           </ul>
       </div>
   `

}


//instead of doing fetch for pokemon and finding the trainer through that,
//just load team directly from html and access pokemon from trainer

function loadTeam(pokemons){
  let lis = ``
  //not able to access nicknames here b/c was iterating
  //through .data above but full pokemons are stored in included
  //could make individual fetch here but at time
  //USE ACTIVE MODEL SERIALIZER INSTEAD for easier formatting
  //console.log(pokemons)
  // pokemons.forEach(function(poke){
  //   console.log(poke)
  //   //need to include nickname in serializer!
  //   lis += `<li>${poke.nickname} <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
  // })
  return lis
}


// function createPokeLi(pokemon) {
//   const poke = pokemon.data.attributes
//   //const trainerCard =
//   const trainerID = pokemon.data.relationships.trainer.data.id
//   //const trainerCard = document.getElementById(`trainer-${trainerID}`)
//   //const ul = trainerCard.ul.innerHTML
//   //console.log(trainer)
//   // return `
//   //      <li>${poke.nickname} <button class="release" data-pokemon-id="${poke.id}">Release</button></li>
//   //  `
// }
//
// function loadTeam(trainer) {
//   const team = trainer.relationships.pokemons.data
//   const firstPokeID = team[0].id
//   loadPokemon(firstPokeID)
//   //don't have access to Pokemon.all automatically,
//   //first need to fetch all pokemon
//   //or actually just fetch one pokemon at a time
//   //so iterate through all and call load poke or maybe generate poke card
//   //const allPokemon =
//   //const firstPoke = Pokemon.find_by_id(firstPokeID)
//
// }

//load team -for trainer card

//add pokemon to team

//release pokemon from team
