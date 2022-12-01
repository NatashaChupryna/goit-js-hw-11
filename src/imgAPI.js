import Notiflix from 'notiflix';
// import axios from 'axios';

const axios = require('axios').default;

export class imagesAPI {
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
  resetPage() {
    this.page = 1;
  }

  async fetchImg() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '31663443-8f4004a5a69c11dc368053c6d';

    try {
      const response = await axios.get(
        `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      console.log(response);
      // if (!response.ok) {
      //   throw new Error(response.statusText);
      // };
      
      return await response;
   
    }
    catch (error) {
      return Notiflix.Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again."'
      );
    }
  }
}
