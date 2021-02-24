import { Trie } from './trie.js';
import { countries } from './countries.js';

const input = document.getElementById('input');
const results = document.getElementById('results');
const trie = new Trie();
console.log('blaaaa');

const countriesList = countries.map((country) => country.name.toLowerCase());

countriesList.forEach((country) => trie.insert(country));

//Helper function to create new <p> elements to be added to the results list.
const newElement = (str) => {
  const p = document.createElement('p');
  p.classList = 'results';
  p.innerText = str;
  return p;
};

input.addEventListener('click', (e) => {
  e.target.innerHTML = '';
});

//Autocomplete country name as user starts typing
input.addEventListener('keyup', (e) => {
  results.innerHTML = '';
  let value = e.target.innerHTML.toLowerCase();
  let countries = trie.autoComplete(value);

  for (let country of countries) {
    results.appendChild(newElement(country));
  }
});
