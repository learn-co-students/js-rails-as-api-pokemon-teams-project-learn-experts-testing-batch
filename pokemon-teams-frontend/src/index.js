const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');


function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json));
}

function renderTrainers(json) {
    for (trainer of json) {
        renderTrainer(trainer);
    }
}

function renderTrainer(trainer) {
    const div = createDiv();
    const p = createP();
    const addButton = createAddButton(trainer);
    const ul = document.createElement('ul');
    main.append(div);
    div.append(p);
    div.append(addButton);
    div.append(ul);
    trainer.pokemons.forEach(renderPokemon);
}

function createDiv() {
    const div = document.createElement('div');
    div.setAttribute("class", "card");
    div.setAttribute("data-id", `${trainer.id}`);
    return div
}

function createP() {
    const p = document.createElement('p');
    p.innerText = trainer.name;
    return p;
}

function createAddButton(trainer) {
    const addButton = document.createElement('button');
    addButton.setAttribute("data-trainer-id", `${trainer.id}`);
    addButton.innerText = "Add Pokemon";
    addButton.addEventListener("click", function() {
        addPokemon(trainer.id);
    })
    return addButton;
}

function addPokemon(trainer_id) {
    fetch(TRAINERS_URL + `/${trainer_id}`)
    .then(resp => resp.json())
    .then(trainer => {
        if (trainer.pokemons.length < 6) {
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                    trainer_id: trainer.id
                })
            })
            .then(resp => resp.json())
            .then(pokemon => renderPokemon(pokemon))
            .catch(error => alert(error.message));
        }
    });
}

function renderPokemon(pokemon) {
    const ul = document.querySelector(`div[data-id='${pokemon.trainer_id}']`).querySelector('ul');
    const li = createLi(pokemon);
    const releaseButton = createReleaseButton(pokemon.id, ul);
    li.append(releaseButton);
    ul.append(li);
}

function createLi(pokemon) {
    const li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species}) `;
    return li
}

function createReleaseButton(pokemon_id, ul) {
    const releaseButton = document.createElement('button');
    releaseButton.setAttribute("class", "release");
    releaseButton.setAttribute("data-pokemon-id", `${pokemon_id}`);
    releaseButton.innerText = "Release";
    releaseButton.addEventListener("click", function(e) {
        fetch(POKEMONS_URL + `/${pokemon_id}`, {
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then(() => ul.removeChild(e.target.parentElement))
        .catch(error => alert(error.message))
    })
    return releaseButton;
}

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers();
})
