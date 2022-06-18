// =========== MovieSearch ===================

// import NProgress from 'nprogress';
// import apiService from "./apiService";
// import renderGallery from "./templates/movieGallary";
// import { renderPaginationButtons } from "./pagination";
// import { resetPagination } from "./pagination";
// import { input } from "./apiService";

// import {markupGallery} from './templates/movieGallary'                   +++ это
// const mainContainer = document.querySelector('.movie-card-list');        +++ это

// const searchFormEl = document.querySelector(".form__search");
// const cardListEl = document.querySelector(".movie-card-list");
// const searchErrMsgEl = document.querySelector(".search__error");
// let allGenres;

// apiService.fetchGenresList().then((data)=> {
//     allGenres = data;
// });

// searchFormEl?.addEventListener('submit', onSearchButton);

// export default function onSearchButton (e) {
//     e.preventDefault();

//     if (input.value === '') {
//         searchErrMsgEl.style.display = "block";
//         return
//     }

//     NProgress.start();
//     apiService.movieSearch().then(({ total_pages, page, results })=> {
//         if (!results.length  ) {
//             searchErrMsgEl.style.display = "block";
//             return
//         }

//         searchErrMsgEl.style.display = "none";
//         clearGallery();
//         resetPagination();

//         renderGallery(results, allGenres);        ======    вместо этого =======

//   const filmData = renderGallery(data.results, allGenres);     =====
//   const markupMovie = markupGallery(filmData)                    =====   будет этл
//   mainContainer.insertAdjacentHTML("beforeend", markupMovie);     =====

//         renderPaginationButtons(total_pages, page);

//     })
//     .catch(error => console.log(error))
//     .finally(NProgress.done())
// };

// function clearGallery() {
//     cardListEl.innerHTML = '';
// };

// ======================================================

//  ================ ApiService ======================

// import axios from 'axios';

// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = '33da1ae0687d870981cf19ad4813876b';
// const TREND_URL = `${BASE_URL}/trending/movie/day`;
// const URL_ID = `${BASE_URL}/movie/`;

// export const input = document.querySelector('#search-query');

// export default {
//   async fetchTrendData(page = 1) {
//     const {data} = await axios.get(`${TREND_URL}?api_key=${API_KEY}&page=${page}`);

//     return data;
//   },

//   async fetchGenresList() {
//     const allGenres = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

//    return allGenres.data;
//   },

//   async fetchFullMovieInfo(id) {
//     const movieFullInfo = await axios.get(`${URL_ID}/${id}?api_key=${API_KEY}`);

//     return movieFullInfo.data;
//   },

//   async movieSearch(page = 1) {
//     const foundMovies = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&page=${page}&query=${input.value}`);

//     return foundMovies.data;
//   },
// };

//  ================ MovieGallary =========================

// import noPoster from '../../images/no-poster.jpg';
// const IMG_URL= `https://image.tmdb.org/t/p/w500`;

// export default function renderGallery(results, dataGenres) {
// 	const genres = dataGenres?.genres

//     return results.map(({ poster_path, original_title, release_date, genre_ids, id }) => {

// 		if (original_title === "") {
//         	original_title = "Sorry, no title for the movie.";
// 		}

// 		if (!release_date) {
// 			release_date = "Expected";
// 		}

// 		const genresNames = genre_ids.reduce((acc, itemId, index) => {
// 			if (!genre_ids.length) {
// 				return acc;
// 			}

// 			if(index <= 1){
// 				const genreName = genres?.find(({id}) => id === itemId)

// 				if(index <= genre_ids.length - 2) {
// 					return acc + genreName?.name + ', ';
// 				}

// 				return acc + genreName?.name + ' ';
// 			}

// 			if(index === 2) {
// 				return acc + "Others";
// 			}
// 			return acc;
// 		}, "")

// 		const fullGenresNames = genres ? genresNames : "Other"
// 		const releaseYear = release_date?.split("-").slice(0, 1);
// 		const imagePoster = poster_path ? `${IMG_URL}${poster_path}` : noPoster;

// 		return { id, imagePoster, original_title, releaseYear, fullGenresNames }

// 	})

// }

// export function markupGallery(results) {
// 	return results.map(({ id, imagePoster, original_title, releaseYear, fullGenresNames }) => {

//       return `<li  class="movie-card-item">
// 				<div class="movie-poster__container">
// 					<img src="${imagePoster}" alt="poster" class="imagePoster" data-id="${id}"/>
// 				</div>
// 				<div class="movie-card-item__info">
// 					<h2 class="movie-card-item__title" data-id="${id}">${original_title}</h2>
// 					<p class="movie-card-item__text">${fullGenresNames} | ${releaseYear} </p>
// 			</li>`;
//     }).join('');
// }

//  =====================================================

//  ================ Index.Js ===================

// import  "./js/templates/darkThema";
// import apiService from "./js/apiService";
// import renderGallery from "./js/templates/movieGallary";
// import { renderPaginationButtons } from "./js/pagination";
// import renderMovieModal from "./js/templates/renderMovieModal";
// import openModal from "./js/modal-open";
// import onSearchButton from "./js/movieSearch";
// import NProgress from 'nprogress';

// import {markupGallery} from './js/templates/movieGallary'

// let allGenres;
// const addToWatchedBtn = document.querySelector('.btn-watched');
// const mainContainer = document.querySelector('.movie-card-list');

// NProgress.start();
// openModal()

// apiService.fetchGenresList().then((data)=> {
//   allGenres = data;
// })

// apiService.fetchTrendData().then((data)=> {

//   const filmData = renderGallery(data.results, allGenres);
//   const markupMovie = markupGallery(filmData)
//   mainContainer.insertAdjacentHTML("beforeend", markupMovie);

//   renderPaginationButtons(data.total_pages, data.page);

// }).catch(error => console.log(error))
// .finally(NProgress.done())

//  ========================================

// =================modal-open==============

// import apiService from './apiService'
// import renderMovieModal from './templates/renderMovieModal';
// import addToLibrary  from './addToLibrary';
// import removeFromLibrary from './removeFromLibrary';
// import NProgress from 'nprogress';
// //import 'nprogress/nprogress.css';
// import renderLibrary from './templates/movieCardLibrary';

// const refs = {                                                                  //   Добавил
//     watchedMovies: document.querySelector('button[data-action="watched"]'),     //   Добавил
//     queueMovies: document.querySelector('button[data-action="queue"]'),         //   Добавил
// }

// const modal = document.querySelector('.backdrop');

// const modalMovieContainer = document.querySelector('.film-content');
// const modalButtonClose = document.querySelector('.modal__button-close');
// let watchedArr = JSON.parse(localStorage.getItem('watched'))? JSON.parse(localStorage.getItem('watched')) : [];
// let queueArr = JSON.parse(localStorage.getItem('queue')) ? JSON.parse(localStorage.getItem('queue')) :[];

// export default function openModal(movieContainer) {

//     movieContainer.addEventListener('click', onClick)

// }

// async function onClick(e) {
//     NProgress.start();
//     if (e.target.nodeName !== "IMG" && e.target.nodeName !== "H2") {
//         return
//     }
//     document.body.classList.add("modal-open");
//     modal.classList.remove('is-hidden')
//     modalButtonClose.addEventListener('click', modalClose)
//     window.addEventListener("keyup", press)
//     window.addEventListener("click", onCloseBackdropClick)

//     const filmId = e.target.dataset.id;

//     const fullMovieInfo = await apiService.fetchFullMovieInfo(filmId);

//     const createMarkupFilmInModal = await renderMovieModal(fullMovieInfo);

//     modalMovieContainer.insertAdjacentHTML("beforeend", createMarkupFilmInModal);

//     NProgress.done();

//     const addToWatchedBtn = document.querySelector('.btn-watched');
//     const addToQueueBtn = document.querySelector('.btn-qweqwe');

//     const bodyOfLybrary = document.body.classList.contains('library')                       //   Добавил
//     const isWatchedActiv = refs.watchedMovies?.classList.contains('library-btn__isActive')    //   Добавил
//     const isQueueActiv = refs.queueMovies?.classList.contains('library-btn__isActive')         //   Добавил

//     addToWatchedBtn.addEventListener('click', onClickWatchedBtn );
//     addToQueueBtn.addEventListener('click', onClickQueueBtn);

//     function onClickWatchedBtn () {
//         addToWatchedBtn.classList.toggle('pressed');

//         if (addToWatchedBtn.classList.contains('pressed')) {
//             addToWatchedBtn.textContent = 'Remove from Watched';
//             addToLibrary(fullMovieInfo, watchedArr, addToWatchedBtn.dataset.target);

//             if (isWatchedActiv) {
//                 bodyOfLybrary && renderLibrary(watchedArr);
//             }

//             return
//         }

//         addToWatchedBtn.textContent = 'Add to Watched';
//         removeFromLibrary(filmId, watchedArr, addToWatchedBtn.dataset.target);

//         if (isWatchedActiv) {

//             bodyOfLybrary && renderLibrary(watchedArr);

//         }

//     }

//     function onClickQueueBtn()  {
//         addToQueueBtn.classList.toggle('pressed');

//         if (addToQueueBtn.classList.contains('pressed')) {
//             addToQueueBtn.textContent = 'Remove from Queue';
//             addToLibrary(fullMovieInfo, queueArr, addToQueueBtn.dataset.target);

//             if (isQueueActiv) {
//                 bodyOfLybrary && renderLibrary(queueArr);

//             }
//             return
//         }

//         addToQueueBtn.textContent = 'Add to Queue';
//         removeFromLibrary(filmId, queueArr, addToQueueBtn.dataset.target);

//         if (isQueueActiv) {
//             bodyOfLybrary && renderLibrary(queueArr);

//         }

//     }

//     watchedArr.forEach(obj => {
//         if (obj.id === Number(filmId)) {
//         addToWatchedBtn.classList.add('pressed');
//         addToWatchedBtn.textContent = 'Remove from Watched';
//     }

//     });

//     queueArr.forEach(obj => {
//         if (obj.id === Number(filmId)) {
//             addToQueueBtn.classList.add('pressed');
//             addToQueueBtn.textContent = 'Remove from Queue';
//         }
//     });

// }

// function press(e) {
//     if (e.code === "Escape") {
//         modalClose();
//         window.removeEventListener("keyup", press);
//         modalButtonClose.removeEventListener('click', modalClose);
//     }
//     return
// }

// function onCloseBackdropClick(e) {
//     if (e.target.dataset.close === 'backdrop') {
//         modalClose();

//     }
//     return;
// }

// function modalClose(e) {
//     document.body.classList.remove("modal-open");
//     modal.classList.add('is-hidden');
//     window.removeEventListener("keyup", press);
//     window.removeEventListener("click", onCloseBackdropClick);
//     modalButtonClose.removeEventListener('click', modalClose);
//     modalMovieContainer.innerHTML = "";
// }

//================================Кнопки на карточки========================================


  //  <div class="btn-box">
  //       <button class="btn-watche" data-id="${id}" data-target="watched">add to <br class="transfer" />Watched</button>
  //       <button class="btn-queue" data-id="${id}" data-target="queue">add to queue</button>
  // </div> 


// import "./js/darkThema";
// import "./js/cursor";
// import apiService from "./js/apiService";
// import renderGallery from "./js/templates/movieGallary";
// import { renderPaginationButtons } from "./js/pagination";
// import renderMovieModal from "./js/templates/renderMovieModal";
// import openModal from "./js/modal-open";
// import onSearchButton from "./js/movieSearch";
// import NProgress from 'nprogress';

// import "./js/team-modal";
// import "./js/sliderTrendingMovies";
// import { renderMovieCardsSlider } from "./js/templates/renderMovieCardsSlider";
// import './js/helpers/back-to-top';


// import addToLibrary from './js/addToLibrary';
// import removeFromLibrary from './js/removeFromLibrary';



// let allGenres;
// const filmList = document.querySelector('.movie-card-list'); 
// let watchedArr = JSON.parse(localStorage.getItem('watched')) ? JSON.parse(localStorage.getItem('watched')) : [];
// let queueArr = JSON.parse(localStorage.getItem('queue')) ? JSON.parse(localStorage.getItem('queue')) : [];


// NProgress.start();
// openModal(filmList);

// const mainContainer = document.querySelector('.movie-card__container');
// apiService.fetchGenresList().then((data) => {
//   allGenres = data;
// })

// apiService.fetchTrendData().then((data) => {
 
//   renderMovieCardsSlider(data.results);
//   renderGallery(data.results, allGenres);

  // const addToWatchedBtn = document.querySelectorAll('.btn-watche');
  // const addToQueueBtn = document.querySelectorAll('.btn-queue');

  // addToWatchedBtn.forEach(btn => {
  //   watchedArr.forEach(obj => {
      
  //     if (obj.id === Number(btn.dataset.id)) {
  //       btn.classList.add('pressed');
  //       btn.textContent = 'Remove from Watched';
        
  //     }
  //   });
  // })
  
  // addToQueueBtn.forEach(btn => {
  //   queueArr.forEach(obj => {
    
  //     if (obj.id === Number(btn.dataset.id)) {
  //       btn.classList.add('pressed');
  //       btn.textContent = 'Remove from Queue';
        
  //     }
  //   });
  // })



//   renderPaginationButtons(data.total_pages, data.page);

// }).catch(error => console.log(error));
// NProgress.done();


// const mainListContainer = document.querySelector('.movie-card-list');
// mainListContainer.addEventListener('click', onListClick)

// async function onListClick(e) {
  
//   if (!e.target.dataset.target) {
//     return
//   }
  
//   const filmId = e.target.dataset.id;
//   const fullMovieInfo = await apiService.fetchFullMovieInfo(filmId);


//   if (e.target.dataset.target === "watched") {
//     e.target.classList.toggle('pressed');

//     if (e.target.classList.contains('pressed')) {
//       e.target.textContent = 'Remove from Watched';
//       addToLibrary(fullMovieInfo, watchedArr, e.target.dataset.target);

//       return
//     }
    
//     e.target.textContent = 'Add to Watched';
//     removeFromLibrary(filmId, watchedArr, e.target.dataset.target);
            
//   }

//   if (e.target.dataset.target === "queue") {
//     e.target.classList.toggle('pressed');

//     if (e.target.classList.contains('pressed')) {
//       e.target.textContent = 'Remove from Queue';
//       addToLibrary(fullMovieInfo, queueArr, e.target.dataset.target);
//       return
//     }
    
//     e.target.textContent = 'Add to Queue';
//     removeFromLibrary(filmId, queueArr, e.target.dataset.target);
            
//   }


// }





//=============================
// export const updaterStorage = {
    
//   addToLibrary(data, arr, key) {
//     arr.push(data);
//     localStorage.setItem(`${key}`, JSON.stringify(arr));
//   },

//   removeFromLibrary(id, arr, key) {
//     const index = arr.findIndex(obj => obj.id === Number(id));
//     arr.splice(index, 1);
//     localStorage.setItem(`${key}`, JSON.stringify(arr));
//   },
// };





