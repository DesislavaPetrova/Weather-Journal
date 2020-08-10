/* Global Variables */
// HTML elements to get the values
const userZip = document.getElementById('zip');
const userFeelings = document.getElementById('feelings');

// HTML elements to update dynamically
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// HTML element to listen for click events
const button = document.getElementById('generate');

// Personal API Key for OpenWeatherMap API
const apiKey = '811f9d05ea0e82781380daee49e13798';
const mainURL = 'https://api.openweathermap.org/data/2.5/weather';
const server = 'http://localhost:8080';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
button.addEventListener('click', () => {
    findWeather(mainURL, zip.value, apiKey)
        .then(temp => {
            return {date: newDate, temp, content: feelings.value};
        })
        .then(data => {
            postData('/add', data);
            return data;
        })
        .then(({temp, date, content}) => updateUI(temp, date, content))
        .catch(e => {
            console.error(e);
        });
});

/* Function to GET Web API Data*/
const findWeather = async (mainURL, userZip, apiKey) => {
    try {
        const req = await fetch(`${mainURL}?zip=${userZip},us&units=metric&APPID=${apiKey}`);
        const results = await req.json();
        const {
            main: {temp},
        } = results;
        return temp;
    } catch (error) {
        console.log('This is an error: ', error);
    }
};

/* Function to POST data */
const postData = async (path, data) => {
    console.log(data);
    try {
        await fetch(path, {
            method: 'POST',
            credentials : 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.log('This is an error: ', error);
    }
};

// Update UI dynamically
const updateUI = async (temperature, newDate, feelings) => {
    date.innerText = newDate;
    temp.innerText = `${temperature} deg`;
    content.innerText = feelings;
};