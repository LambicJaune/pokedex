let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let row = document.querySelector('.pokemon-list');
        let col = document.createElement('div');
        col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-3');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('nameButton', 'btn', 'btn-primary', 'btn-lg', 'w-100');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');

        col.appendChild(button);
        row.appendChild(col);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(
                pokemon.name,
                'Height: ' + pokemon.height,
                pokemon.imageUrl,
                pokemon.types
            );
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

function showModal(title, text, img, types) {
    let typeNames = types.map((t) => t.type.name).join(', ');
    document.querySelector('#pokemonNameTitle').innerText = title;
    document.querySelector('#pokemonHeight').innerText = text;
    document.querySelector('#pokemonImage').setAttribute('src', img);
    document.querySelector('#pokemonTypes').innerText = 'Types: ' + typeNames;
}

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

let searchForm = document.getElementById('searchForm');
let searchInput = document.getElementById('searchInput');
let pokemonListContainer = document.querySelector('.pokemon-list');

searchForm.addEventListener('input', function () {
    let query = searchInput.value.toLowerCase();
    let allPokemons = pokemonRepository.getAll();

    let filtered = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
    );

    pokemonListContainer.innerHTML = '';
    filtered.forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
});
