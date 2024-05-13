#!/usr/bin/node

// Import the necessary modules
const request = require('request');
const fs = require('fs');

// Get the URL and the file path from command line arguments
const url = process.argv[2];
const filePath = process.argv[3];

// Function to fetch the content and write it to the file
request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
  } else {
    fs.writeFile(filePath, body, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });
  }
});
