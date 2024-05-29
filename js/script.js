const global = {
  currentPage: window.location.pathname
}

//Fetch data from TMDB API
async function fetchApiData () {
  const API_KEY = "31079babc1cb1333fc04de99dd3e5658"
  const API_URL = "https://api.themoviedb.org/3/"

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=es-ES`)

  const data = await response.json()

  return data
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
      console.log("Home")
      break
    case "/shows.html":
      console.log("Shows")
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