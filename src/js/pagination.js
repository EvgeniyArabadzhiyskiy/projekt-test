
import { renderMovieCards, searchFilms, popularFilms, searchInputValue } from './searchFilms';

const galleryBox = document.querySelector('.gallery__box');
const pagContainer = document.querySelector('.pagination-container');

let pageNumber = 0;

export function paginationPage({ page, total_pages }) {
  let paginationMarkup = '';
  let beforePrevPage = page - 2;
  let prevPage = page - 1;
  let nextPage = page + 1;
  let afterNextPage = page + 2;
  pageNumber = page;

  if (page > 1) {
    paginationMarkup += `<li class="pagin-item pagination-arrow"> « </li> `;
  }

  if (page > 1) {
    paginationMarkup += `<li class="pagin-item pagination-pages">1</li> `;
  }

  if (prevPage > 3) {
    paginationMarkup += `<li class="pagin-item step"> ... </li> `;
  }

  if (page > 3) {
    paginationMarkup += `<li class="pagin-item pagination-pages">${beforePrevPage}</li> `;
  }

  if (page > 2) {
    paginationMarkup += `<li class="pagin-item pagination-pages">${prevPage}</li> `;
  }

  paginationMarkup += `<li class="pagin-item pagination-pages current-page">${page}</li>`;

  if (page < total_pages - 1) {
    paginationMarkup += `<li class="pagin-item pagination-pages">${nextPage}</li> `;
  }

  if (page < total_pages - 2) {
    paginationMarkup += `<li class="pagin-item pagination-pages">${afterNextPage}</li> `;
  }

  if (nextPage < total_pages - 2) {
    paginationMarkup += `<li class="pagin-item step"> ... </li> `;
  }

  if (page < total_pages) {
    paginationMarkup += `<li class="pagin-item pagination-pages">${total_pages}</li> `;
  }

  if (page < total_pages) {
    paginationMarkup += `<li class="pagin-item pagination-arrow"> » </li> `;
  }

  pagContainer.innerHTML = paginationMarkup;
  pagContainer.addEventListener('click', onClickPagination);
}

function onClickPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  const value = evt.target.textContent;

  switch (value) {
    case ' » ':
      pageNumber += 1;
      break;
    case ' « ':
      pageNumber -= 1;
      break;
    case ' ... ':
      return;
    default:
      pageNumber = value;
  }

  if (searchInputValue) {
    searchFilms(searchInputValue, pageNumber).then(data => {
        galleryBox.innerHTML = '';
        renderMovieCards(data.results)
        paginationPage(data)
    })
  }
  else{
    popularFilms(pageNumber).then(data => {
        galleryBox.innerHTML = '';
        renderMovieCards(data.results);
        paginationPage(data);
      });
  }
  
  

    //   console.log(searchInputValue);


  // if (evt.target.classList.contains('pagination-pages')) {
    //   pageNumber = Number(evt.target.textContent);
    // }
  
    // if (value === ' ... ') {
    //   return
    // }
    
    // if (value === ' » ') {
    //   pageNumber += 1;
    // }
  
    // if (value === ' « ') {
    //   pageNumber -= 1;
    // }
}
