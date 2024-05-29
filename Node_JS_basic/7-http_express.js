const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;
const databaseFile = process.argv[2];

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(databaseFile)
    .then(() => {
      res.write('This is the list of our students\n');
      res.end();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
