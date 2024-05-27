const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.trim().split('\n');
    const fields = {};
    lines.shift(); // Remove header

    lines.forEach((line) => {
      if (line.trim()) {
        const [firstname, lastname, age, field] = line.split(',');
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }
    });

    const totalStudents = lines.length;

    resolve({ totalStudents, fields });
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(process.argv[2])
    .then(({ totalStudents, fields }) => {
      res.write('This is the list of our students\n');
      res.write(`Number of students: ${totalStudents}\n`);
      for (const [field, students] of Object.entries(fields)) {
        res.write(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`);
      }
      res.end();
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
