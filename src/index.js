import './css/styles.css';
import Notiflix from 'notiflix';
import { imagesAPI } from './imgAPI';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const imgAPI = new imagesAPI();
const simpleligthbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadMoreBtn);

function onFormSubmit(event) {
  event.preventDefault();

  imgAPI.searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  imgAPI.resetPage();
  gallery.innerHTML = '';
  simpleligthbox.refresh();
  
  if (imgAPI.searchQuery === '') {
    return Notiflix.Notify.failure('"Please, enter your query"'); //не працює
  }

  imgAPI.fetchImg().then(data => {
   gallery.insertAdjacentHTML('beforeend', markUp(data.hits));
    // simpleligthbox.refresh();
  });
  // loadBtn.classList.remove('hidden')
  loadBtn.classList.toggle('hidden'); //не працює
  // simpleligthbox.refresh();
}

function onLoadMoreBtn(event) {
  imgAPI.page += 1;
  imgAPI.fetchImg().then(data => {
    if (data.hits === data.totalHits) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    return gallery.insertAdjacentHTML('beforeend', markUp(data.hits));
  });
}

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
      <b>Likes : ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views : ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments : ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads : ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

browserslist.clearCaches();
