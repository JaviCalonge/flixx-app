const global = {
  currentPage: window.location.pathname
}

async function displayPopularMovies () {
  const { results } = await fetchAPIData("movie/popular")

  console.log(results)

  results.forEach((movie) => {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
              ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="&{movie.title}"
            />` : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="&{movie.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>
    `
    document.querySelector("#popular-movies").appendChild(div)
  })
}

async function displayTVShows () {
  const { results } = await fetchAPIData("tv/popular")

  console.log(results)

  results.forEach((tv) => {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = `
    <div class="card">
          <a href="tv-details.html?id=${tv.id}">
          ${
            tv.poster_path
            ? `<img
                src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
                class="card-img-top"
                alt="${tv.title}"
              />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Show Title"
            />`
          }
            </a>
            <div class="card-body">
              <h5 class="card-title">${tv.title}</h5>
              <p class="card-text">
                <small class="text-muted">Aired: ${tv.first_air_date}</small>
              </p>
            </div>
          </div>
      `
    document.querySelector("#popular-shows").appendChild(div)
  })
}


//Fetch data from TMDB API
async function fetchAPIData (endpoint) {
  const API_KEY = "31079babc1cb1333fc04de99dd3e5658"
  const API_URL = "https://api.themoviedb.org/3/"

  showSpinner()

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=es-ES`)

  const data = await response.json()

  hideSpinner()

  return data
}

function showSpinner () {
  document.querySelector(".spinner").classList.add("show")
}

function hideSpinner () {
  document.querySelector(".spinner").classList.remove("show")
}



//Highlight active link
function highligthActiveLink () {
  const links = document.querySelectorAll(".nav-link")
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active")
    }
  })
}




//Init App
function init () {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies()
      break
    case "/shows.html":
      displayTVShows()
      break
    case "/movie-details.html":
      console.log("Movie details")
      break 
     case "/tv-details.html":
      console.log("TV details")
      break
    case "/search.html":
      console.log("Search")
      break  
  }

  highligthActiveLink()

}

document.addEventListener("DOMContentLoaded", init)