let pokemonList = [
{name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
{name: 'Charmander', height: 0.6, types: ['fire']},
{name: 'Squirtle', height: 0.5, types: ['water']},
]; 

/* Loop iterating all items of the pokemonList array displaying name and height, with an added conditional displaying an extra comment to any items with a heigth over 0.6 */
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
  if (pokemonList[i].height > 0.6) {
    document.write('- Wow, that\'s big!');
  }
    document.write('<br>');
}
