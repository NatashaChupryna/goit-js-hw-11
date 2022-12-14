import './css/styles.css';
import Notiflix from 'notiflix';
import { imagesAPI } from './imgAPI';
import SimpleLightbox from 'simplelightbox';

// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

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

  if (imgAPI.searchQuery === '') {
    return Notiflix.Notify.failure('"Please, enter your query"');
  }

  imgAPI
    .fetchImg()
    .then(data => {
       console.log(data.data.hits);
      // gallery.insertAdjacentHTML('beforeend', markUp(data.hits));
      gallery.innerHTML = markUp(data.data.hits);
      simpleligthbox.refresh();
      
      loadBtn.classList.remove('hidden');
      if (data.data.hits.length === 0) {
        gallery.innerHTML = '';
        loadBtn.classList.add('hidden');

        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      };
      if (data.data.hits.length) {
        return Notiflix.Notify.success(
          `Hooray! We found ${data.data.totalHits} images.`
        );
      }
    })
    .catch(error => {
     
      Notiflix.Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again."'
      );
    });
}

function onLoadMoreBtn(event) {
  imgAPI.page += 1;
  imgAPI.fetchImg().then(data => {
    if (data.hits === data.data.totalHits) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    return gallery.insertAdjacentHTML('beforeend', markUp(data.data.hits));
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
      <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
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
      <b>Downloads : ${downloads} </b>
    </p>
  </div>
</div>`
    )
    .join('');
}
