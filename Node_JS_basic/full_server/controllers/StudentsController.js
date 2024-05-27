const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
    const database = process.argv[2];

    readDatabase(database)
      .then((fields) => {
        response.status(200).write('This is the list of our students\n');
        const sortedFields = Object.keys(fields).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        sortedFields.forEach((field) => {
          response.write(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`);
        });
        response.end();
      })
      .catch((error) => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const database = process.argv[2];
    const major = request.params.major;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(database)
      .then((fields) => {
        if (!fields[major]) {
          response.status(500).send('Major parameter must be CS or SWE');
          return;
        }
        response.status(200).send(`List: ${fields[major].join(', ')}`);
      })
      .catch((error) => {
        response.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
