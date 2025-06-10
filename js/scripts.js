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
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('nameButton')
        unorderedPokemonList.appendChild(button);
        unorderedPokemonList.appendChild(listItem);
        //Event listener running a console log for each pokemon that is clicked on
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }


    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = ''; //empty the content to prepare it to receive the API's content

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //create the close button and activates it at the click
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = pokemon.name;
        imageElement.style.width = '250px';

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + pokemon.height;

        // extract the objects under "Types", t=item
        let types = pokemon.types.map(t => t.type.name).join(', ');

        let typesElement = document.createElement('p');
        typesElement.innerText = 'Types: ' + types;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        modal.appendChild(heightElement);
        modal.appendChild(typesElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible'); //removes the is-visible class so the modal gets hidden
    }
    // allows to use the escape key to close the modal
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //function allowing the button event listener to log details into the console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //function allowing to load the API containting all the pokemons
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

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();

pokemonRepository.loadList().then(function () {
    //Calls the addListItem function created above on each item in order to generate the Pokemon list as buttons*/
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
