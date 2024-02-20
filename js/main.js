"use strict";
movies.splice(100);

////////////////////////// HTML  Elements///////////////////////
const categoryOption = $("#category");
const moviesWrapper = $(".movies");
const btn = $(".btn");
const header = $("header");
const aside = $("aside");
const searchInput = $("#search");
const resultCount = $("#search_result")
const body = $('body')

///////////////////////////////// category Normalize///////////////////////////////////////////////
const allMovies = movies.map((el) => {
  return {
    title: el.title,
    year: el.year,
    category: el.categories,
    id: el.imdbId,
    rating: el.imdbRating,
    time: `${Math.trunc(el.runtime / 60)} H , ${Math.trunc(el.runtime % 60)} M`,
    language: el.language,
    youtube: `https://www.youtube.com/embed/${el.youtubeId}`,
    summary: el.summary,
    minImage: el.smallThumbnail,
    maxImage: el.bigThumbnail,
  };
});
/////////////////////////////////// data normalize//////////////////////////////////////////////////////////

/////////////////////////////////// Movies category////////////////////////////////////////////////////////
function getCategory(moviesList) {
  let category = [];

  if (moviesList.length) {
    moviesList.forEach((el) => {
      el.category.forEach((el) => {
        if (!category.includes(el)) {
          category.push(el);
        }
      });
    });
  }

  render(category);
}

getCategory(allMovies);

function render(data) {
  if (data.length) {
    data.sort().forEach((el) => {
      const option = createElement("option", "", el);

      categoryOption.appendChild(option);
    });
  }
}

///////////////////////////// cardlani render qilish//////////////

function renderAllMovies(moviesList) {
  console.log(moviesList);
  if (moviesList.length) {
    moviesList.forEach((el) => {
      console.log(el);
      const card = createElement(
        "div",
        "card",
        `
            <img class="" src="${el.minImage}" alt="">
             <h2 class="title">${el.title}</h2>
               <ul class="strongs">
                <li><strong class="strong1">${el.year}</strong></li>
                <li><strong class="strong2">${el.category}</strong></li>
                <li><strong class="strong3">${el.rating}</strong></li>
                <li><strong class="strong4">>${el.language}</strong></li>
              </ul>

              <div class="btns flex items-center gap-x-3">
                <button>
                 <i class="bi bi-bookmark"></i>
               </button>
                <button  class="grid place-content-center p-2 border w-[48px] h-[48px]hover:bg-blue-700" href="fovourtie.html"><i class="bi bi-heart"></i></button>
                </button>
                 </div>
            
              `
      );

      moviesWrapper.appendChild(card);
    });
  }
}
renderAllMovies(allMovies);

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark_theme");
  // document.header.classList.toggle("dark_theme")
  // document.aside.classList.toggle("aside");
});


///////////////////// Global Search//////////////////////////////////////////////////////////////////////
function searchMovies(searchTerm){
  const searchResult =allMovies.filter((el) => el.title.toLowerCase().includes(searchTerm.toLowerCase()))
    if(searchResult.length){
      moviesWrapper.innerHTML= '';
      resultCount.innerHTML=`${searchResult.length} movies`;
      renderAllMovies(searchResult)
  }

  else{
    resultCount.innerHTML= ""
    moviesWrapper.innerHTML = `
    <div class="not-found">
    <h1>NO RESULTS FOUND</h1>
    <a class="home_btn" href="/">Home</a>
    </div>`  
  }
    }
    



searchInput.addEventListener('keyup', (e) => {
  if(e.keyCode==13){
    moviesWrapper.innerHTML=`<span class="loader"></span>`
    setTimeout(() => {
      searchMovies(e.target.value)
    },2000)
  }
})