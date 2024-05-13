#!/usr/bin/node

// Import the filesystem module
const fs = require('fs');

// Get the file path and the string to write from command line arguments
const filePath = process.argv[2];
const content = process.argv[3];

// Function to write the string to the file
fs.writeFile(filePath, content, 'utf8', (err) => {
  if (err) {
    // Print error object if an error occurs during writing
    console.error(err);
  }
});
