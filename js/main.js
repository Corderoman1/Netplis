
// console.log('tamoaqui');
// console.log(window.location.search);
let user = localStorage.getItem("user")
const linkLogin = document.getElementById("login")
let counter = 0
const bgImg = document.querySelectorAll(".header__bgimg")
const asideOption = document.querySelectorAll(".mov__li")

asideOption.forEach(element => {
    element.addEventListener("click",() => {
        asideOption.forEach(option => {
        option.classList.remove("mov__li--active")
    })
        element.classList.add("mov__li--active")
    })
})

linkLogin.addEventListener("click", (e) => {
    e.preventDefault
    showLoginModal()
})
console.log(user);

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
    inputSubmit.setAttribute("type","submit")
    inputSubmit.setAttribute("value","Ingresar")
    inputSubmit.classList.add("modallogin__submit","btn-normal")
    form.appendChild(labelUser)
    form.appendChild(inputText)
    form.appendChild(inputSubmit)
    modalFlex.appendChild(form)
    modallogin.appendChild(modalFlex)
    body.appendChild(modallogin)

    modallogin.addEventListener("mousedown",hideLoginModal)

    inputSubmit.addEventListener("click",(e)=> {
        e.preventDefault()
        if(inputText.value !== ""){
            user = inputText.value
        }

    })
}

function hideLoginModal(){
     const loginModal = document.querySelector(".modallogin")
     loginModal.remove()
}



const loadMovies = async () =>{
    console.log('tamoaqui');
    const movGrid = document.getElementById("grid")
    try{
        const response = await axios.get("https://api.tvmaze.com/shows")
        const movies = response.data
        movGrid.innerHTML = ''
        for(const movie of movies){
            movieCard = createMovieCard(movie)
            movGrid.appendChild(movieCard)
        }
    }catch(error){
        console.log(error); 
    }
}

document.addEventListener("DOMContentLoaded",loadMovies)
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
        console.log(element);
        const movcardcategory = document.createElement("span")
        movcardcategory.textContent = element
        movcardcategory.classList.add(`mov__cardcategory`)
        movcardcategory.classList.add(`mov__cardcategory--${element}`)
        movCategoryFlex.appendChild(movcardcategory)
    })
    movCard.appendChild(movImageContainer)
    movCard.appendChild(movTitle)
    movCard.appendChild(movCategoryFlex)
    movCard.appendChild(movCardButton)
    return movCard
    
}

function changeImg() {
    bgImg.forEach(element => {
        element.classList.remove("imgShown")
    });
    bgImg[counter].classList.add("imgShown")
    if(counter == bgImg.length - 1){
        counter = 0
    }else{
        counter ++
    }
}
setInterval(changeImg,9100)