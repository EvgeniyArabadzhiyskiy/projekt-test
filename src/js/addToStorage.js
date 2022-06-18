import { infoFilm } from "./searchFilms";


export function addToWatch() {
    const addWatchBtn = document.querySelector('.add-watch')
    addWatchBtn.addEventListener('click', onClickAddBtn)
    return addWatchBtn
}

const parsedLocStor = JSON.parse(localStorage.getItem('watched'))
export let watchedArr = parsedLocStor ? parsedLocStor : []


function onClickAddBtn(evt) {
    const movieId = Number(evt.target.dataset.id)

    // const filmsId = watchedArr.map(film => film.id)
    // const isInclud =  filmsId.includes(movieId)
    
    // if (!isInclud) {
    //     watchedArr.push(infoFilm)
    // }

    
    

    evt.target.classList.toggle('passed')
    
    if (evt.target.classList.contains('passed')) {
        evt.target.textContent = "Remove"
        watchedArr.push(infoFilm)

    }
    else {
        evt.target.textContent = "Add to Watched"
        // const filmsId = watchedArr.map(film => film.id)
        // const index = filmsId.indexOf(movieId)

        // const findFilm = watchedArr.find(obj => obj.id === movieId);
        // const index = watchedArr.indexOf(findFilm)
        
        const index = watchedArr.findIndex(film => film.id === movieId)
        

        
        watchedArr.splice(index,1)
    }


    // console.log(watchedArr);

    const jsonData = JSON.stringify(watchedArr)
    localStorage.setItem('watched', jsonData)
}

