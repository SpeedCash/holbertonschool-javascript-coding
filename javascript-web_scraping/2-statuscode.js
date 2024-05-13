#!/usr/bin/node

// Import the request module
const request = require('request');

// Get the URL from the command line arguments
const url = process.argv[2];

// Function to make a GET request and print the status code
request.get(url, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    // Print the status code
    console.log('code:', response.statusCode);
  }
});
