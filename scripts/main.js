const url = 'https://pixabay.com/api/';
const apiKey = "42110623-f962f4f597ca7cf92ce7360e7"

async function getResults(searchTerm) {
    let response = await fetch(url + apikey + searchTerm);
    let json = await response.json();
    return json;
    /*let temperature = json.current.temperature_2m;
    let p = document.querySelector('p');
    p.textContent = 'Current temperature in Gothenburg: ' + temperature;*/
}
function formatSearchTerms(){
    let str = '?';

}
function test(){
    alert("Wel, Hello There!")
}