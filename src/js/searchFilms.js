const galleryBox = document.querySelector('.gallery__box');
const btnPrev = document.querySelector('[data-action="prev"]');
const btnNext = document.querySelector('[data-action="next"]');
const btnCurrent = document.querySelector('[data-action="current"]');
const searchForm = document.querySelector('.search__form');
// const galleryCard = document.querySelector('.search__form');



function makeMarkupFilmCard({ imageSrc, title, movieGenres, movieYear, id }) {
    return `
    <li  class="gallery__card" >
      <img id=${id}  src=${imageSrc} alt=${title} data-modal="open">
      <div class="title__wrapper">
          <h3 class="card__title">${title}</h3>
          <div class="wrapper__info">
              <ul class="card__list">${movieGenres}</ul>
              <p class="card__year"> | ${movieYear}</p>
          </div>  
      </div>
    </li>`;
}


function makeDataMovie({ poster_path, title, genres, release_date, id }) {
  
  const movieYear = release_date.slice(0, 4);

  const filtredGanres = genres.slice();
  filtredGanres.splice(2);

  if (genres.length > 2) {
    filtredGanres.push({ name: 'Others' });
  }

  const movieGenres = filtredGanres.map(
    genre => `<li class="card__genre">${genre.name} ${' '}</li>`
  );

  const imageSrc = `https://image.tmdb.org/t/p/w500${poster_path}`;



  const dataMovie = {
    id,
    imageSrc,
    movieGenres,
    title,
    movieYear

  }

  return dataMovie


}

// const data = makeMarkupFilmCard


// ${genres.map(genre => {
//     return `<p class="card__genre">${genre.name}</p>`
// } ).join(' ')}

// function makeMarkupFilmCards(results) {
//     return results.map(({poster_path}) => {
//         const imageSrc = `https://image.tmdb.org/t/p/w500${poster_path}`
//         return `<li class="gallery__items"><img  src=${imageSrc} alt="" width="200"></li>`
//     }).join(' ')

// }
let page = 1;
btnCurrent.textContent = 1;

function createFIlmCardById(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d8b0ad5d4fb786d62f1125fa68e28b99`
  )
    .then(res => res.json())
    .then(data => {
      // console.log('data', data);

      if (!data.poster_path) {
        return;
      }
      
      const markupData = makeDataMovie(data);

      const markup = makeMarkupFilmCard(markupData)

      galleryBox.insertAdjacentHTML('beforeend', markup);
    });
}

const popularFilms = page => {
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=d8b0ad5d4fb786d62f1125fa68e28b99&page=${page}`
  )
    .then(res => res.json())
    .then(data => {
      const filmId = data.results.map(film => film.id);

      filmId.map(createFIlmCardById);
    });
};

popularFilms(1);

const searchFilms = (text, page) => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=d8b0ad5d4fb786d62f1125fa68e28b99&query=${text}&page=${page}`
  )
    .then(res => res.json())
    .then(data => {
      const filmId = data.results.map(film => film.id);

      filmId.map(createFIlmCardById);
    });
};

searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(evt) {
  evt.preventDefault();
  const searchInput = evt.target.elements.query;

  galleryBox.innerHTML = '';
  searchFilms(searchInput.value);
}

btnNext.addEventListener('click', onBtnNextClick);
btnPrev.addEventListener('click', onBtnPrevClick);

function onBtnNextClick(params) {
  galleryBox.innerHTML = '';

  page += 1;
  popularFilms(page);
  btnCurrent.textContent = page;
}

function onBtnPrevClick(params) {
  if (page === 1) {
    return;
  }

  galleryBox.innerHTML = '';
  page -= 1;
  popularFilms(page);
  btnCurrent.textContent = page;
}

export default popularFilms;

//  ------------Modal Window -------------------
const backDrop = document.querySelector('.bacdrop');
const modalWindow = document.querySelector('.modal__window');
const btnCloseModal = document.querySelector('.modal__close');

galleryBox.addEventListener('click', modalToggle);
btnCloseModal.addEventListener('click', modalToggle);
backDrop.addEventListener('click', backdropCloseModal);

function modalToggle(evt) {
  if (evt.target.dataset.modal) {
    backDrop.classList.toggle('backdrop__is-hidden');
    makeModalCard(evt.target.id);
  }
}

function backdropCloseModal(evt) {
  if (evt.target === evt.currentTarget) {
    backDrop.classList.toggle('backdrop__is-hidden');
  }
}



function superFunction2(id) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d8b0ad5d4fb786d62f1125fa68e28b99`
    )
      .then(res => res.json())
      .then(data => {
        // console.log('data', data);
  
        if (!data.poster_path) {
          return;
        }
  
        const markup = makeMarkupFilmCard(data);
        
  
        modalWindow.innerHTML = markup
      });
  }

function makeModalCard(id) {
  if (id) {
    superFunction2(id)
  }
}
