//Array of Pokemons contained in a IIFE with a function add and a function getAll
let pokemonRepository = (function() {
 let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, types: ['fire']},
    {name: 'Squirtle', height: 0.5, types: ['water']},
 ];
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
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
}
//function allowing the button event listener to log details into the console
    function showDetails(pokemon) {
        console.log(pokemon);
}
 return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
}
})();

//Add function allowing to add a new item to the Array inside of the repository
pokemonRepository.add({name: 'Pikachu', height: 0.4, types: ['electric']});
//Calls the addListItem function created above on each item in order to generate the Pokemon list as buttons*/
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
