const http = require('http');
const fs = require('fs');

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

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(process.argv[2])
      .then(({ totalStudents, fields }) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`Number of students: ${totalStudents}\n`);
        for (const [field, students] of Object.entries(fields)) {
          res.write(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`);
        }
        res.end();
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(error.message);
      });
  }
});

app.listen(1245);

module.exports = app;
