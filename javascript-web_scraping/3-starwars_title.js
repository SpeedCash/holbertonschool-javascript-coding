#!/usr/bin/node

// Import the request module
const request = require('request');

// Get the movie ID from command line arguments
const movieId = process.argv[2];
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

// Function to make a GET request and print the movie title
request(apiUrl, { json: true }, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
  } else if (response.statusCode === 200) {
    // Print the movie title if the request was successful
    console.log(body.title);
  } else {
    // Handle non-200 responses
    console.log('Failed to retrieve data');
  }
});
