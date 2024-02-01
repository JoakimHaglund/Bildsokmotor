const url = 'https://pixabay.com/api/';
const apiKey = "42110623-f962f4f597ca7cf92ce7360e7"

async function getResults(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
  
      // Check if the 'hits' array exists in the response
      if (data && data.hits) {
        const hitsArray = data.hits;
        console.log(hitsArray);
        removeImages();
        for(let test of hitsArray) {
            console.log(test.webformatURL);
            addImgHTML(test.webformatURL);
        }
      } else {
        console.error('Data or hits array not available in the response');
      }
      
};
function addImgHTML(imgUrl){
    let img = document.createElement('img');
    img.src = imgUrl;
    let div = document.querySelector('div');
    div.append(img);
}

function buildApiCall(term, color){
    return `${url}?key=${apiKey}&q=${term}&colors=${color}`;
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
}

const form = document.getElementById('searchForm');
form.addEventListener("submit", onFormSubmit);