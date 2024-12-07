const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  fetchTrainers();
  document.querySelector('main').addEventListener('click', handleClicks);
});

const handleClicks = event => {

  const target = event.target;
  if (target.innerText === "Add Pokemon"){
    const trainerID = target.parentElement.dataset.id;
    addPokemon(trainerID);
  }else if (target.innerText === "Release"){
    const pokemonID = target.dataset.pokemonId;
    releasePokemon(pokemonID)
  }
}

const fetchTrainers = () => {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(createTrainerCards)
}

const createTrainerCards = data => {
  cards = data.map(trainer => createSingleTrainerCard(trainer)).join('');
  document.querySelector('main').innerHTML = cards;
}

const createSingleTrainerCard = trainer => {
  const { id, name, pokemon } = trainer;
  const pokemonList = pokemon.map(p => createPokemonListItem(p)).join('');
  return `
  <div class="card" data-id="${id}">
    <p>${name}</p>
    <button data-trainer-id="${id}">Add Pokemon</button>
    <ul>
      ${pokemonList}
    </ul>
  </div>
  `
}

const createPokemonListItem = (pokemon) => {
  const { nickname, species, id } = pokemon;
  return `
  <li>${nickname} (${species}) <button class="release" data-pokemon-id="${id}">Release</button></li>
  `
}

const addPokemon = id => {
  options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: id})
  }
  fetch(POKEMONS_URL, options)
  .then(resp => resp.json())
  .then(data => {
    const pokemon = createPokemonListItem(data);
    document.querySelector(`div[data-id="${id}"] ul`).innerHTML += pokemon;
  })
}

const releasePokemon = pokemonID => {
  options = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  }
  fetch(POKEMONS_URL + `/${pokemonID}`, options)
  .then(resp => resp.json())
  .then(data => {
    document.querySelector(`button[data-pokemon-id="${data.id}"]`).parentElement.remove();
  })
}