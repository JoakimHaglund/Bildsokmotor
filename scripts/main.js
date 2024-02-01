const url = 'https://pixabay.com/api/';
const apiKey = "42110623-f962f4f597ca7cf92ce7360e7"
let index = 0;
async function getResults(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
  
      // Check if the 'hits' array exists in the response
      if (data && data.hits) {
        const hitsArray = data.hits;
        console.log("hello:  " + data.length);
        console.log(hitsArray);
        removeImages();
        addImagesHTML(hitsArray, 10);
      } else {
        console.error('Data or hits array not available in the response');
      }
      
};
function addImagesHTML(hitsArray, count){
    count += index;
    for(let i = index; i < count; i++){
        let img = document.createElement('img');
        img.src = hitsArray[i].webformatURL;
        let div = document.querySelector('div');
        div.append(img);
        index = i;
    }
};
function buildApiCall(term, color){
    return `${url}?key=${apiKey}&q=${term}&colors=${color}&per_page=200`;
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



nextButton.onClick = () => {
removeImages();
addImagesHTML();
}

PreviousButton.onClick = () => {
removeImages();
addImagesHTML();
}