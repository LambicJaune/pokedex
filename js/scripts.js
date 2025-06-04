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
 return {
    add: add,
    getAll: getAll
 };
})();

//Add function to add a new item to the Array inside of my repository
pokemonRepository.add({name: 'Pikachu', height: 0.4, types: ['electric']});
/* loop iterating the different items with the properties name and height w/ a conditional adding a comment for items w/ a height over 0.6*/
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('name: ' + pokemon.name  + ' (height: ' + pokemon.height + ') '); 
        if(pokemon.height > 0.6) {
        document.write('- Wow, that\'s big!');
    }
    document.write('<br>');
});
