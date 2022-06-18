import axios from 'axios';
// import "./addToStorage"
import { addToWatch } from "./addToStorage";
import defaultImage from '../images/defaulIMG.jpg'
import {watchedArr} from './addToStorage'
import { paginationPage } from "./pagination";


// const defaultImage  = "https://image.tmdb.org/t/p/w500/pLAeWgqXbTeJ2gQtNvRmdIncYsk.jpg"

const API_KEY = 'api_key=d8b0ad5d4fb786d62f1125fa68e28b99';
const responseAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

const galleryBox = document.querySelector('.gallery__box');
const btnPrev = document.querySelector('[data-action="prev"]');
const btnNext = document.querySelector('[data-action="next"]');
const btnCurrent = document.querySelector('[data-action="current"]');
const searchForm = document.querySelector('.search__form');
const pagContainer = document.querySelector('.pagination-container')


export let searchInputValue = ''
let movieDataCollection = []
let allGanres = null


responseAxios(`genre/movie/list?${API_KEY}&language=en-US`)
.then(res => {
  allGanres = res.data?.genres
})



function makeMarkupFilmCard({ imageSrc, title, genres, releaseYear, id }) {

  return `
    <li  class="gallery__card" >
      <img id=${id}  src="${imageSrc}" alt="${title}" data-modal="open">
      <div class="title__wrapper">
          <h3 class="card__title">${title}</h3>
          <div class="wrapper__info">
              
            <p class="card__year"> | ${releaseYear}</p>
          </div>  
      </div>
    </li>`;
}

function makesMovieData({
  poster_path,
  title,
  genre_ids,
  release_date,
  id,
  popularity,
  overview,
  vote_average,
  vote_count,
}) {

  
  if (release_date === "") {
    release_date = "No release date";
  }
  const releaseYear = release_date?.split("-").slice(0, 1) 
  const imageSrc = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImage;
  
  // console.log(genre_ids);
  // const genresNames = genre_ids.reduce((acc, itemId, index) => {
	// 	const genreName = allGanres.find(({id})  => id=== itemId)
    
	// 	return [...acc, genreName.name]


	// },[])
  // console.log("genresNames ~ genresNames", genresNames);

  // // console.log(genresNames.length <= 2);
  // if (genresNames.length <= 2) {
  //   genresNames
  // }

  // if (genresNames.length > 2) {
  //   genresNames.splice(2)
    
  // }

  // if (genresNames.length > 2) {
  //   // console.log("hello");
  //   // genresNames.join(', ') + "Others"
  // }


  // ===================
  // const genresNames = genres.reduce((acc, { name }, index) => {
  //   if (!genres.length) {
  //     return acc;
  //   } 
  //   else if (index <= 1) {
  //     if (index <= genres.length - 2) {
  //       return acc + name + ', ';
  //     }

  //     return acc + name + ' ';
  //   } 
  //   else if (index === 2) {
  //     return acc + 'Others';
  //   }

  //   return acc;
  // },'');

  // ===========================
  

  // console.log("genresNames ~ genresNames", genresNames);
  
// console.log(genre_ids);
//  console.log(allGanres);

  // const filtredGanres = genres.slice();
  // filtredGanres.splice(2);

  // if (genres.length > 2) {
  //   filtredGanres.push({ name: 'Others' });
  // }

  // const movieGenres =
  //   filtredGanres.length !== 0
  //     ? filtredGanres.map(genre => `<li class="card__genre">${genre.name}</li>`)
  //     : `<li class="card__genre">All</li>`;

  return {
    id,
    title,
    genre_ids,
    imageSrc,
    overview,
    releaseYear,
    popularity,
    vote_count,
    vote_average,
  };
}


export const popularFilms = (page = 1) => {
  return responseAxios(`trending/movie/day?${API_KEY}&page=${page}`)
  .then(res => res.data);
};

popularFilms().then(data => {
  renderMovieCards(data.results) 
  paginationPage(data) 
                     
})


export const searchFilms = (text, page = 1) => {
  return  responseAxios(`search/movie?${API_KEY}&query=${text}&page=${page}`)
    .then(res => res.data);
};



export  function renderMovieCards(results) {
  movieDataCollection = []

  const filmId = results.map(film => {
    const movieData = makesMovieData(film)
    const markup = makeMarkupFilmCard(movieData) 
    galleryBox.insertAdjacentHTML('beforeend', markup);

    movieDataCollection.push(movieData);
    
  });
}



searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(evt) {
  evt.preventDefault();

  searchInputValue = evt.target.elements.query.value;

  galleryBox.innerHTML = '';


  searchFilms(searchInputValue, 1).then(data => {
    renderMovieCards(data.results)
    paginationPage(data)
  })
}



export default popularFilms;

//  ------------Modal Window -------------------
const backDrop = document.querySelector('.bacdrop');
const modalWindow = document.querySelector('.modal__window');
const btnCloseModal = document.querySelector('.modal__close');

galleryBox.addEventListener('click', onOpenModal);
btnCloseModal.addEventListener('click', closeBtnModal);
backDrop.addEventListener('click', backdropCloseModal);

function modalToggle() {
  backDrop.classList.toggle('backdrop__is-hidden');
}

function closeBtnModal() {
  modalToggle();
}

function onOpenModal(evt) {
  if (evt.target.dataset.modal) {
    modalToggle();
    makeModalCard(evt.target.id);
  }
  

  const btnWatched = document.querySelector('.add-watch')
  
  watchedArr.forEach(film => {
    if (film.id === Number(btnWatched.dataset.id)) {
      btnWatched.classList.add('passed')
      btnWatched.textContent = "Remove"
    }
  })

  
  window.addEventListener('keydown', onPressEsc);
}

function backdropCloseModal(evt) {
  if (evt.target === evt.currentTarget) {
    modalToggle();
  }
}

function onPressEsc(evt) {
  if (evt.code === 'Escape') {
    modalToggle();
    window.removeEventListener('keydown', onPressEsc);
  }
}

function createModalCard({
  id,
  title,
  // genres,
  overview,
  popularity,
  vote_count,
  vote_average,
  imageSrc,
}) {
  
  return `
  <li  class="modal-gallery__card" >
    
    <div class="modal-title__wrapper">

        <img class="modal__image"  src=${imageSrc} alt=${title}  data-modal="open" width="320">

        <div class="modal-wrapper__info">
            <h3 class="modal__title">${title}</h3>

          <div class="data__wrapper">
              <div>
              <p class="modal__info">Vote / Votes</p>
              <p class="modal__info">Popularity</p>
              <p class="modal__info">Original Title</p>
              <p class="modal__info">Genre</p>
              </div>

              <div>
              <p class="modal__data"> <span class="vote__data"> ${vote_average} </span> / ${vote_count}</p>
              <p class="modal__data">${popularity}</p>
              <p class="modal__data modal__data--upper">${title}</p>
              <p class="modal__data">0</p>
              </div> 
          </div>

            <p class="modal__about">About</p>
            <p class="modal__about--text"> ${overview}</p>
            <button class="add-watch" type="button" data-id="${id}">Add to Watched</button>
        </div>  

    </div>
  </li>`;
}



export let infoFilm = null
  
function makeModalCard(id) {
  const filmDataById = movieDataCollection.filter(film =>  film.id === Number(id))
  const info = filmDataById[0]

  infoFilm = info
 
  const markup = createModalCard(info);

  modalWindow.innerHTML = markup;

  addToWatch()


}









