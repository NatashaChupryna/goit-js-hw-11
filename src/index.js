import './css/styles.css';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
import imagesAPI from './imgAPI';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const imgAPI = new imagesAPI;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  imgAPI.searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (imgAPI.searchQuery === '') {
    return;
  }

  imgAPI.fetchImg().then(data => {
    return gallery.insertAdjacentHTML = markUp(data);
  });
}

function markUp(array) {
  return array.map(
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

class imagesAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async fetchImg(name, page) {
    try {
      const response = await fetch(
        `${BASE_URL}?key=${KEY}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      return Notiflix.Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again."'
      );
    }
  }
}
