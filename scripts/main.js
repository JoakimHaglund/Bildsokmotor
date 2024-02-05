const url = "https://pixabay.com/api/";
const apiKey = "42110623-f962f4f597ca7cf92ce7360e7";

let currentPage = 1;
let totalPages = 0;
let searchTerm = '';
let searchColor = '';

async function getResults(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();

    // Check if the 'hits' array exists in the response
    if (data && data.hits) {
        totalPages = Math.ceil(data.totalHits / 10);
        console.log(url);
        console.log("search hits: " + totalPages);
        removeImages();
        addImagesHTML(data);
        setPageButtonState();
    } else {
        console.error("Data or hits array not available in the response");
    }
}
function addImagesHTML(hitsArray) {
    let content = document.querySelector("#content");
    hitsArray.hits.forEach((hit) => {
        let img = document.createElement("img");
        img.src = hit.webformatURL;

        let tagElement = document.createElement("p");
        tagElement.textContent = `${hit.tags}`;

        let userElement = document.createElement("p");
        userElement.textContent = `taken by: ${hit.user}`;
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        imageContainer.appendChild(img);
        imageContainer.appendChild(tagElement);
        imageContainer.appendChild(userElement);
        content.appendChild(imageContainer);
    });
}
function buildApiCall(term, color) {
    return `${url}?key=${apiKey}&q=${term}&colors=${color}&per_page=10&page=${currentPage}`;
}
function formatSearchTerm(string) {
    let words = string.split(" ");
    let output = "";
    for (let word of words) {
        output += word + "+";
    }
    output = output.substring(0, output.length - 1);
    return output;
}
function onFormSubmit(event) {
    currentPage = 1;
    totalPages = 0;
    event.preventDefault();
    let data = new FormData(event.target);
    searchTerm = data.get("searchTerm");
    searchColor = data.get("searchColor");
    console.log(`searchTerm: ${searchTerm}, searchColor: ${searchColor}`);
    /*gör allt */
    searchTerm = formatSearchTerm(searchTerm);
    let url = buildApiCall(searchTerm, searchColor);
    console.log(url);
    let result = getResults(url);
    //console.log(result);

    document.getElementById('page-button-container').style.display = 'flex';
}
function removeImages() {
    let content = document.querySelector("#content");
    content.replaceChildren();
}
function disableButton(buttonId) {
    let button = document.querySelector(buttonId);
    button.disabled = true;
}
function enableButton(buttonId) {
    let button = document.querySelector(buttonId);
    if (button.disabled === true) {
        button.disabled = false;
    }
}
function setPageButtonState(){
    console.log('currentpage: ' + currentPage +' totalhits: ' +totalPages)
    if (currentPage === 1) {
        disableButton('#previousPageButton');
    } else{
        enableButton('#previousPageButton');
    };
    if(totalPages > 1 && currentPage !== totalPages){
        enableButton('#nextPageButton');
    } else {
        disableButton('#nextPageButton');
    }
    
};


const form = document.getElementById("searchForm");
form.addEventListener("submit", onFormSubmit);

let previousButton = document.querySelector("#previousPageButton");
let nextButton = document.querySelector("#nextPageButton");


nextButton.onclick = () => {
    if (currentPage < totalPages) {
        currentPage++;
        console.log(searchTerm);
        searchTerm = formatSearchTerm(searchTerm);
        let apiUrl = buildApiCall(searchTerm, searchColor);
        getResults(apiUrl);
    };
};

previousButton.onclick = () => {
    if (currentPage > 1) {
        currentPage--;


        console.log("--" + currentPage);
        searchTerm = formatSearchTerm(searchTerm);
        let apiUrl = buildApiCall(searchTerm, searchColor);
        getResults(apiUrl);
    } 
};

