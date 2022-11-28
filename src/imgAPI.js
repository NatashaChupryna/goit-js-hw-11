import Notiflix from 'notiflix';

export default class imagesAPI {
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
