// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an istance of an app
const app = express();

// Dependencies 
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8080;
// Setup Server
const server = app.listen(port, listening());

function listening() {
    console.log(`Server running on localhost: ${port}`);
}

// GET route
app.get('/all', sendData);

function sendData (req, res) {
    res.send(projectData);
    console.log('GET request is being processed. Sending Project data.');
}

// POST route
app.post('/add', callBack);

function callBack (req, res) {
    console.log('POST request is being processed. Adding new data to projectData.\n', req.body);
    if (req.body) {
        projectData.date = req.body.date;
        projectData.temp = req.body.temp;
        projectData.content = req.body.content;
    }
    res.send(JSON.stringify(projectData));
    console.log(
        `Temperature: ${projectData.temp}, date: ${projectData.date}, content: ${projectData.content}`
    );
}
