let pokemonList = [
{name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
{name: 'Charmander', height: 0.6, types: ['fire']},
{name: 'Squirtle', height: 0.5, types: ['water']},
]; 

/* New forEach loop iterating the different items with the properties name and height w/ a conditional adding a comment for items w/ a height over 0.6*/
pokemonList.forEach(function(pokemon) {
    document.write('name: ' + pokemon.name  + ' (height: ' + pokemon.height + ') '); 
        if(pokemon.height > 0.6) {
        document.write('- Wow, that\'s big!');
    }
    document.write('<br>');
});

