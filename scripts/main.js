const url = 'https://pixabay.com/api/';
const apiKey = "42110623-f962f4f597ca7cf92ce7360e7"

async function getResults(searchTerm) {
    let response = await fetch(url + apikey + searchTerm);
    let json = await response.json();
    return json;
    let temperature = json.current.temperature_2m;
    let p = document.querySelector('p');
    p.textContent = 'Current temperature in Gothenburg: ' + temperature;
};
function buildApiCall(term, color){
    return `${url}?key=${apiKey}&q=${term}&colors=${color}`;
}
function formatSearchTerm(string){
    let words = string.split(" ");
    console.log(words);
    let output = "";
    for(let word in words) {
        output += word + "+";
    }
    console.log(output);
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
}

const form = document.getElementById('searchForm');
form.addEventListener("submit", onFormSubmit);