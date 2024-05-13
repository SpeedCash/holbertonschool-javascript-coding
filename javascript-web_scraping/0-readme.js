#!/usr/bin/node

// Import the filesystem module
const fs = require('fs');

// Get the file path from the command line arguments
const filePath = process.argv[2];

// Function to read and print the content of the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    // Print error object if an error occurs
    console.error(err);
  } else {
    // Print the content of the file
    console.log(data);
  }
});
