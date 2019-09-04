const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main'); // to append to later

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
})

const fetchTrainers = () => {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => displayTrainers(json))
}

const displayTrainers = (trainers) => {
  for (let i = 0; i < trainers.length; i++){
    main.innerHTML += `
    <div class="card" data-id="${trainers[i].id}">${trainers[i].name}
      <button data-trainer-id="${trainers[i].id}" onClick=addPokemon(event)>Add Pokemon</button>
      <ul>
        ${displayPokemon(trainers[i].pokemon)}
      </ul>
    </div>
    `
  }
}

const displayPokemon = (pokemon) => {
  let pokemons = ""
  for (let i = 0; i < pokemon.length; i++){
    pokemons +=  `<li id=${pokemon[i].id}>${pokemon[i].nickname} (${pokemon[i].species}) <button class="release" onClick=releasePokemon(event) data-pokemon-id="${pokemon[i].id}">Release</button></li>`
  }
  return pokemons
}

const addPokemon = (event) => {
  event.preventDefault()
  const trainerId = event.target.dataset.trainerId
  fetch(TRAINERS_URL + `/${trainerId}`)
  .then(resp => resp.json())
  .then(trainer => {
        fetch(POKEMONS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ trainer_id: trainer.id })
        })
        .then(resp => resp.json())
        .then(pokemon => {
          if (pokemon.message) {
            alert(pokemon.message)
          } else {
            const li = `<li id=${pokemon.id}>${pokemon.nickname} (${pokemon.species}) <button class="release" onClick=releasePokemon(event) data-pokemon-id="${pokemon.id}">Release</button></li>`
            const trainerCard = document.querySelectorAll(`[data-id="${pokemon.trainer_id}"]`)[0]
            trainerCard.getElementsByTagName("ul")[0].innerHTML += li
          }
        })
        .catch(error => alert(error.message));
    });
}

const releasePokemon = (event) => {
  const pokemonId = event.target.dataset.pokemonId
  const pokemonElement = document.getElementById(pokemonId)
  pokemonElement.remove()

  fetch(POKEMONS_URL + `/${pokemonId}`, {
    method: "DELETE" ,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
}
