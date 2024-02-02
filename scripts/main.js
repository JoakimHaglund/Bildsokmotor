const url = 'https://pixabay.com/api/';
const apiKey = "42110623-f962f4f597ca7cf92ce7360e7"

let currentPage = 1;

async function getResults(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
  
      // Check if the 'hits' array exists in the response
      if (data && data.hits) {
        const hitsArray = data.hits;
        removeImages();
        addImagesHTML(hitsArray);
      } else {
        console.error('Data or hits array not available in the response');
      }
      
};
function addImagesHTML(hitsArray) {
    let content = document.querySelector('#content');
    hitsArray.forEach(hit => {
        let img = document.createElement('img');
        img.src = hit.webformatURL;
        content.appendChild(img);
    });
}

function buildApiCall(term, color){
    return `${url}?key=${apiKey}&q=${term}&colors=${color}&per_page=10&page=${currentPage}`;
};
function formatSearchTerm(string){
    let words = string.split(" ");
    console.log(words);
    let output = "";
    for(let word of words) {
        output += word + "+";
    }
    output = output.substring(0, output.length - 1);
    console.log(output);
    return output;
};
function onFormSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
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
    currentPage++;
    let searchTerm = document.querySelector('input[name="searchTerm"]').value;
    let searchColor = document.querySelector('select[name="searchColor"]').value;
    searchTerm = formatSearchTerm(searchTerm);
    let apiUrl = buildApiCall(searchTerm, searchColor);
    getResults(apiUrl);
}

previousButton.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        let searchTerm = document.querySelector('input[name="searchTerm"]').value;
        let searchColor = document.querySelector('select[name="searchColor"]').value;
        searchTerm = formatSearchTerm(searchTerm);
        let apiUrl = buildApiCall(searchTerm, searchColor);
        getResults(apiUrl);
    }
}