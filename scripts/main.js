const url = 'https://pixabay.com/api/';
const apiKey = "42110623-f962f4f597ca7cf92ce7360e7"

let currentPage = 1;
let totalHits = 0;

async function getResults(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
  
      // Check if the 'hits' array exists in the response
      if (data && data.hits) {
        totalHits = Math.ceil(data.totalHits / 10);
        console.log('totalhits: ' + totalHits)
        removeImages();
        addImagesHTML(data);
      } else {
        console.error('Data or hits array not available in the response');
      }
      
};
function addImagesHTML(hitsArray) {
    let content = document.querySelector('#content');
    hitsArray.hits.forEach(hit => {
        let img = document.createElement('img');
        img.src = hit.webformatURL;

        let tagElement = document.createElement('p');
        tagElement.textContent = `Tags: ${hit.tags}`;

        let userElement = document.createElement('p');
        userElement.textContent = `User: ${hit.user}`;
        
        let textContainer = document.createElement('div');
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        textContainer.appendChild(tagElement);
        textContainer.appendChild(userElement);

        imageContainer.appendChild(img);
        imageContainer.appendChild(textContainer);
        content.appendChild(imageContainer);
    });
}

function buildApiCall(term, color){
    return `${url}?key=${apiKey}&q=${term}&colors=${color}&per_page=10&page=${currentPage}`;
};
function formatSearchTerm(string){
    let words = string.split(" ");
    let output = "";
    for(let word of words) {
        output += word + "+";
    }
    output = output.substring(0, output.length - 1);
    return output;
};
function onFormSubmit(event){
    event.preventDefault();
    let data = new FormData(event.target);
    let searchTerm = data.get("searchTerm");
	let searchColor = data.get("searchColor");
    console.log(`searchTerm: ${searchTerm}, searchColor: ${searchColor}`);
    /*gör allt */
    searchTerm = formatSearchTerm(searchTerm);
    let url = buildApiCall(searchTerm, searchColor);
    console.log(url);
    let result = getResults(url);
    //console.log(result);
};
function removeImages(){
    let content = document.querySelector('#content');
    content.replaceChildren();
};

const form = document.getElementById('searchForm');
form.addEventListener("submit", onFormSubmit);

let previousButton = document.querySelector('#previousPageButton');
let nextButton = document.querySelector('#nextPageButton');



nextButton.onclick = () => {
    if (currentPage < totalHits){
        currentPage++;
        console.log('++' + currentPage);
        let searchTerm = document.querySelector('input[name="searchTerm"]').value;
        let searchColor = document.querySelector('select[name="searchColor"]').value;
        searchTerm = formatSearchTerm(searchTerm);
        let apiUrl = buildApiCall(searchTerm, searchColor);
        getResults(apiUrl);
    } 
}

previousButton.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        console.log('--' + currentPage);
        let searchTerm = document.querySelector('input[name="searchTerm"]').value;
        let searchColor = document.querySelector('select[name="searchColor"]').value;
        searchTerm = formatSearchTerm(searchTerm);
        let apiUrl = buildApiCall(searchTerm, searchColor);
        getResults(apiUrl);
    }
}