const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const databaseFile = process.argv[2];

    readDatabase(databaseFile)
      .then((fields) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is the list of our students\n');
        for (const [field, students] of Object.entries(fields)) {
          res.write(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`);
        }
        res.end();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const databaseFile = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databaseFile)
      .then((fields) => {
        if (fields[major]) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write(`List: ${fields[major].join(', ')}\n`);
          res.end();
        } else {
          res.status(500).send('Major parameter must be CS or SWE');
        }
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
