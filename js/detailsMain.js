let movId = window.location.search
movId = movId.split('?id=')
console.log(`https://api.tvmaze.com/show/${movId[1]}`);


function createDetailsPage(data){
    const header = document.getElementById("header")
    const bgImg = document.createElement("img")
    const headerContent = document.createElement("div")
    const headerTitle = document.createElement("h1")    
    const headerSlo = document.createElement("div")
    const headerEndeDate = document.createElement("p")
    const headerLink = document.createElement("a")

    headerEndeDate.classList.add("header__enDate")
    headerLink.classList.add("header__link")
    headerSlo.innerHTML = data.summary
    headerSlo.classList.add("header__summary")
    bgImg.classList.add("header__bgimgDetails")
    headerContent.classList.add("header__content")
    headerTitle.classList.add("header__title")
    bgImg.src = data.image.original
    bgImg.alt = `Image of ${data.name}`
    headerEndeDate.textContent = `Ended at: ${data.ended}`
    headerTitle.textContent = data.name
    headerLink.textContent = "VER"
    headerLink.href = data.url


    
    //appends

    header.appendChild(bgImg)
    headerContent.appendChild(headerTitle)
    headerContent.appendChild(headerEndeDate)
    headerContent.appendChild(headerSlo)
    headerContent.appendChild(headerLink)
    header.appendChild(headerContent)
    
}


const loadMovies = async () =>{
    try{
        const response = await axios.get(`https://api.tvmaze.com/shows/${movId[1]}`)
        console.log(response.data);
        
        createDetailsPage(response.data)
        
        // const movies = response.data
        // movGrid.innerHTML = ''
        // for(const movie of movies){
        //     movieCard = createMovieCard(movie)
        //     movGrid.appendChild(movieCard)
        // }
    }catch(error){
        console.log(error)
    }
}
document.addEventListener("DOMContentLoaded",loadMovies)