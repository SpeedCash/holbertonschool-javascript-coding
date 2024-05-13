#!/usr/bin/node

// Import the request module
const request = require('request');

// Get the API URL from command line arguments
const apiUrl = process.argv[2];

// Function to fetch the todos and compute the completion count per user
request(apiUrl, { json: true }, (error, response, todos) => {
  if (error) {
    console.error('Error:', error);
  } else {
    const completedTasks = {};

    // Process each todo item
    todos.forEach(todo => {
      if (todo.completed) {
        // If the task is completed, increment the count for the user
        if (completedTasks[todo.userId]) {
          completedTasks[todo.userId]++;
        } else {
          completedTasks[todo.userId] = 1;
        }
      }
    });

    // Print the result for users with at least one completed task
    console.log(completedTasks);
  }
});
