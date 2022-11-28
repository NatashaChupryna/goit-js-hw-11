import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const searchingCountry = event.target.value.trim();

  if (searchingCountry === '') {
    return;
  };
  fetchCountries(searchingCountry)
    .then(data => {
      if (data.length >= 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 1) {
        list.innerHTML = '';
        div.innerHTML = cardMarkUp(data);
      } else {
        div.innerHTML = '';
        list.innerHTML = listMarkUp(data);
      }
      return data;
    })
    .catch(error =>
      Notiflix.Notify.failure('"Oops, there is no country with that name"')
    );
}

function cardMarkUp(array) {
  return array
    .map(
      item => `<div class="country_card">
        <img class="flag" src="${item.flags.svg}" alt="" width="60" height="30">
        <h2 class="off_name">${item.name.official}</h2>
        <p>Capital : ${item.capital}</p>
        <p>Population : ${item.population}</p>
        <p>Languages : ${Object.values(item.languages)}</p></div>`
    )
    .join('');
}

function listMarkUp(array) {
  return array
    .map(
      item => `<li>
        <img class="flag" src="${item.flags.svg}" alt="" width="60" height="30">
        <h2 class="off_name">${item.name.official}</h2></li>`
    )
    .join('');
}
