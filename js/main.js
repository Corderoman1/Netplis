

// localStorage.setItem("user","")
let user = localStorage.getItem("user")
const linkLogin = document.getElementById("login")
let counter = 0
const asideOption = document.querySelectorAll(".mov__li")
const prevPage = document.querySelector(".mov__pageNavPre")
const nextPage = document.querySelector(".mov__pageNavNex")
const buscarButton = document.getElementById("searchButton")
const movIncharge = document.getElementById("grid")
const navContent = document.querySelector(".mov__navContent")
const showMenu = document.querySelector(".mov__displayMenu")
const mobileMenu = document.querySelector(".mov")
let movies = {}
let pageCounter = 0
const genresIcons = new Map ([
    ["Thriller", "😬"],
    ["Romance", "💖"],
    ["Horror", "😱"],
    ["Comedy", "😂"],
    ["Action", "🥷"],
    ["Drama", "😭"],
    ["Adventure", "🧗"],
    ["Science-Fiction", "🛰️"],
    ["Crime", "🚨"],
    ["Legal", "📃"],
    ["Medical", "🧑‍⚕️"],
    ["War", "🪖"],
])

if(window.visualViewport.width <= 600){
    mobileMenu.classList.add("mov__mobile")
    navContent.classList.add("mov__navContent--hidden")
    showMenu.classList.remove("mov__displayMenu--hidden")
}else{
    mobileMenu.classList.remove("mov__mobile")
    navContent.classList.remove("mov__navContent--hidden")
    showMenu.classList.add("mov__displayMenu--hidden")
}   

window.visualViewport.addEventListener("resize",(e)=>{
    if(window.visualViewport.width <= 600){
        mobileMenu.classList.add("mov__mobile")
        navContent.classList.add("mov__navContent--hidden")
        showMenu.classList.remove("mov__displayMenu--hidden")
    }else{
        mobileMenu.classList.remove("mov__mobile")
        navContent.classList.remove("mov__navContent--hidden")
        showMenu.classList.add("mov__displayMenu--hidden")
    }
    
})
showMenu.addEventListener("click",(e)=>{
    navContent.classList.toggle("mov__navContent--hidden")
    mobileMenu.classList.toggle("mov__mobile")
    if(e.target.textContent == ">"){
        e.target.textContent = "X"
    }else{
        e.target.textContent = ">"
    }

    
})

buscarButton.addEventListener("click",()=>{
    const input = document.getElementById("searchContent")
    if(input.value != ""){
        searchMovie(input.value)
    }
})

if(!user){
    const body = document.getElementById("body")
    body.classList.add("logoff")
    body.classList.remove("login")
}else{
    const body = document.getElementById("body")
    const wellUser = document.getElementById("well-user")
    const headerTitle = document.querySelector(".header__title")
    body.classList.remove("logoff")
    body.classList.add("login")
    wellUser.textContent = user
    headerTitle.textContent = `Hola, ${user}. Que vemos ahora?`
    window.scrollTo(0,832.7999877929688)
}
const searchMovie = async (value) => {
    const movGrid = document.getElementById("grid")
    try{
        const response = await axios.get("https://api.tvmaze.com/search/shows",{params:{q:value}})
        console.log(response);
        
        movGrid.classList.remove("mov__incharge")
        movGrid.classList.add("mov__grid")
        movies = response.data
        movGrid.innerHTML = ''
        if(movies.length != 0){
            for(movie of movies){
                movieCard = createMovieCard(movie.show)
                movGrid.appendChild(movieCard)
            }
        }else{
             movGrid.innerHTML = `Lo sentimos, no encontramos nada para ${value}`
        }
    }
    catch(error){
        console.log(error);
    }
}


const loadMovies = async () =>{
    const movGrid = document.getElementById("grid")

    let filterText = document.querySelector('.mov__li--active')
    filterText = filterText.textContent
    
    try{
        const response = await axios.get("https://api.tvmaze.com/shows",{params:{page:pageCounter}})
        movGrid.classList.remove("mov__incharge")
        movGrid.classList.add("mov__grid")
        movies = response.data
        movGrid.innerHTML = ''
        
        for(const movie of movies){
            
            if(filterText == "All"){
                movieCard = createMovieCard(movie)
                movGrid.appendChild(movieCard)
                
            }else{
                if( movie.genres.includes(filterText)){
                    movieCard = createMovieCard(movie)
                    movGrid.appendChild(movieCard)
                }
            }
        }
    }catch(error){
        movGrid.innerHTML = movIncharge
        
    }
}

document.addEventListener("DOMContentLoaded",loadMovies)

// asideOption.forEach(element => {
//     element.addEventListener("click",(e) => {
//         asideFiltering(e.target)
//     })
// })


for(option of asideOption){
    option.addEventListener("click",(e)=>{
        asideFiltering(e.target)
    })
}
function asideFiltering(element){
    for(option of asideOption){
        option.classList.remove("mov__li--active")
    }
    element.classList.add("mov__li--active")
    loadMovies()
}

linkLogin.addEventListener("click", (e) => {
    e.preventDefault
    showLoginModal()
})

function showLoginModal(){
    const body = document.querySelector("body")
    const modallogin = document.createElement("div")
    modallogin.classList.add("modallogin")
    const modalFlex = document.createElement("div")
    modalFlex.classList.add("modallogin__flex")
    const form = document.createElement("form")
    form.classList.add("modallogin__form")
    const labelUser = document.createElement("label")
    labelUser.classList.add("modallogin__formName")
    labelUser.textContent = "Usuario"
    labelUser.setAttribute("for","name")
    const inputText = document.createElement("input")
    inputText.setAttribute("type","text")
    inputText.setAttribute("placeholder","Usuario")
    inputText.classList.add("modallogin__input")
    const inputSubmit = document.createElement("input")
    inputSubmit.type = "submit"
    inputSubmit.value = "Ingresar"
    inputSubmit.classList.add("modallogin__submit","btn-normal")
    form.appendChild(labelUser)
    form.appendChild(inputText)
    form.appendChild(inputSubmit)
    modalFlex.appendChild(form)
    modallogin.appendChild(modalFlex)
    body.appendChild(modallogin)


    inputSubmit.addEventListener("click",(e)=> {
        e.preventDefault()
        if(inputText.value !== ""){
            localStorage.setItem("user",inputText.value)
            user = inputText.value
        }
        hideLoginModal()
    })
}

function hideLoginModal(){
     const loginModal = document.querySelector(".modallogin")
     loginModal.remove()
     location.reload()
}


function createMovieCard(movie){
    const movCard = document.createElement("div")
    const movImageContainer = document.createElement("i")
    const movImage = document.createElement("img")
    const movTitle = document.createElement("p")
    const movCategoryFlex = document.createElement("div")
    const movCardButton = document.createElement("a")
    movCard.classList.add("mov__card")
    movImageContainer.classList.add("mov__cardImg")
    movImage.src = movie.image.medium
    movImage.alt = `image of ${movie.name}`
    movImageContainer.appendChild(movImage)
    movTitle.classList.add("mov__title")
    movTitle.textContent = movie.name
    movCategoryFlex.classList.add("mov__categoryFlex")
    movCardButton.textContent = "VER MAS"
    movCardButton.classList.add("mov__cardButton")
    movCardButton.href = `showdetails.html?id=${movie.id}`
    movCardButton.target = "_blank"
    movie.genres.forEach(element => {
        if(genresIcons.get(element)){  
            const movcardcategory = document.createElement("span")
            movcardcategory.textContent = genresIcons.get(element) + element
            movcardcategory.classList.add(`mov__cardcategory`)
            movcardcategory.classList.add(`mov__cardcategory--${element}`)
            movCategoryFlex.appendChild(movcardcategory)
        }
    })
    movCard.appendChild(movImageContainer)
    movCard.appendChild(movTitle)
    movCard.appendChild(movCategoryFlex)
    movCard.appendChild(movCardButton)
    return movCard
    
}

function changeImg() {
    const bgImg = document.querySelectorAll(".header__bgimg")
    const headerSlo = document.querySelectorAll(".header__slo")
    
    bgImg.forEach(element => {
        element.classList.remove("imgShown")
    });
    bgImg[counter].classList.add("imgShown")
    if(counter == bgImg.length - 1){
        counter = 0
    }else{
        counter ++
    }
    headerSlo.forEach(element => {
        element.classList.remove("header__slo--show")
    });
    headerSlo[counter].classList.add("header__slo--show")
    if(counter == headerSlo.length - 1){
        counter = 0
    }else{
        counter ++
    }
}
setInterval(changeImg,9100)



function chargePage(type){
    
    if(type == "decrease"){
        if(pageCounter != 0){
            pageCounter --
        }
    }else if(type == "increase"){
        if(pageCounter != 10){
            pageCounter ++
        }
    }
    loadMovies()
}


prevPage.addEventListener("click",()=>{
   chargePage("decrease")
    
})
nextPage.addEventListener("click",()=>{
   chargePage("increase")
})
