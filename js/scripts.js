//Array of Pokemons contained in a IIFE with a function add and a function getAll
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    //function allowing to generate dynamic html to display all items in the pokemonList as buttons
    function addListItem(pokemon) {
        let unorderedPokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('nameButton', 'btn', 'btn-primary', 'btn-lg')
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        listItem.appendChild(button);
        unorderedPokemonList.appendChild(listItem);
        //Event listener running a console log for each pokemon that is clicked on
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    //function loading the API containting all the Pokémon
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    //function allowing to load the detailed data of each pokemon
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Adding the details to the item
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
    //function allowing the button event listener to log details into the modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
        showModal(pokemon.name, 'Height: ' + pokemon.height, pokemon.imageUrl, pokemon.types);
    });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();

//diplays all the pokemon details into the modal
function showModal(title, text, img, types) {
    let typeNames = types.map(t => t.type.name).join(', ');
    document.querySelector("#pokemonNameTitle").innerText = title;
    document.querySelector("#pokemonHeight").innerText = text;
    document.querySelector("#pokemonImage").setAttribute('src', img);
    document.querySelector('#pokemonTypes').innerText = 'Types: ' + typeNames;
}

pokemonRepository.loadList().then(function () {
    //Calls the addListItem function created above on each item in order to generate the Pokemon list as buttons*/
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
