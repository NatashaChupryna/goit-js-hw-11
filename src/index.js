import './css/styles.css';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
import imgAPI from './imgAPI';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');


form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    return;
  };

  imgAPI(searchQuery).then(data => 
    gallery.insertAdjacentHTML = markUp(data)
  )
}








// const DEBOUNCE_DELAY = 300;
// const input = document.querySelector('#search-box');
// const list = document.querySelector('.country-list');
// const div = document.querySelector('.country-info');

// input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// function onSearch(event) {
//   const searchingCountry = event.target.value.trim();

//   if (searchingCountry === '') {
//     return;
//   };
//   fetchCountries(searchingCountry)
//     .then(data => {
//       if (data.length >= 10) {
//         Notiflix.Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       } else if (data.length === 1) {
//         list.innerHTML = '';
//         div.innerHTML = cardMarkUp(data);
//       } else {
//         div.innerHTML = '';
//         list.innerHTML = listMarkUp(data);
//       }
//       return data;
//     })
//     .catch(error =>
//       Notiflix.Notify.failure('"Oops, there is no country with that name"')
//     );
// }
function markUp(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <a href="${largeImageURL}"></a>
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

