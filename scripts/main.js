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
    alert("Well, Hello There!")
}

let form = document.getElementById('searchForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = document.getElementById('searchTerm');
    let colorLimit = document.getElementById('colors');
    for(let k in myTest){
        let p = document.querySelector('p');
        p.textContent += k.toString();
    }
    console.log(myTest);
    form.reset();
});