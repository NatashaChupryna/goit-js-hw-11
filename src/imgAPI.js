import Notiflix from 'notiflix';


const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31663443-8f4004a5a69c11dc368053c6d';

export async function imgAPI(name) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
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

