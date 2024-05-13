#!/usr/bin/node

// Import the request module
const request = require('request');

// Get the API URL from command line arguments
const apiUrl = process.argv[2];

// Function to fetch films and count those featuring Wedge Antilles
request(apiUrl, { json: true }, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
  } else if (response.statusCode === 200) {
    let count = 0;
    // Iterate over each film
    body.results.forEach(film => {
      // Check if Wedge Antilles (ID 18) is in the characters list of the film
      if (film.characters.includes(`https://swapi-api.hbtn.io/api/people/18/`)) {
        count++;
      }
    });
    // Print the count of films featuring Wedge Antilles
    console.log(count);
  } else {
    console.log('Failed to retrieve data');
  }
});
