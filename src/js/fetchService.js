import refs from '../js/refs';
import apiService from './apiService.js';
import getMarkupGallery from './gallery.js';
import debounce from 'lodash.debounce';
import { notifyInfo } from './notifications.js';

function initialFetch() {
  apiService
    .fetchPopularMovies()
    .then(({ results }) => results)
    .then(film => {
      const newArrayFilm = film.map(el => {
        const newDate = el.release_date.slice(0, 4);
        el.release_date = newDate;
        return el;
      });
      return getMarkupGallery(newArrayFilm);
    });
}
initialFetch();
// setTimeout(initialFetch, 0);

refs.inputSearch.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(event) {
  const movieToFind = event.target.value;
  apiService.query = movieToFind;
  const cleanMarkup = () => (refs.galleryRef.innerHTML = '');

  cleanMarkup();
  // apiService.fetchMovies().then(({ results }) => getMarkupGallery(results));
  apiService
    .fetchMovies()
    .then(({ results }) => results)
    .then(images => {
      getMarkupGallery(images);
      if (images.length === 0) {
        notifyInfo('Try another word', 'No images found for this request');
      }
    });

  if (apiService.query === '') {
    cleanMarkup();
  }
}
