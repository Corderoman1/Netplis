
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
    
    try{

        const response = await axios.get("https://api.tvmaze.com/shows/1",{params:{limit:2}})
        console.log(response);
    }catch(error){
        console.log("tenemos un error");
        
    }
    
}

document.addEventListener("DOMContentLoaded",loadMovies)

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