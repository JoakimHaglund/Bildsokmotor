const url = 'https://pixabay.com/api/';
const apiKey = "42110623-f962f4f597ca7cf92ce7360e7"

async function start() {
    let response = await fetch(
        'https://api.open-meteo.com/v1/forecast' +
        '?latitude=57.721104651297615' +
        '&longitude=11.976178043983431' +
        '&current=temperature_2m'
    );
    let json = await response.json();

    let temperature = json.current.temperature_2m;
    let p = document.querySelector('p');
    p.textContent = 'Current temperature in Gothenburg: ' + temperature;
}