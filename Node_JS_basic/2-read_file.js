const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.trim().split('\n');
    if (lines.length === 0) throw new Error('Cannot load the database');

    const fields = {};
    let totalStudents = 0;
    lines.shift(); // Remove header

    lines.forEach((line) => {
      if (line.trim()) {
        totalStudents += 1;
        const [firstname, lastname, age, field] = line.split(',');
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }
    });

    console.log(`Number of students: ${totalStudents}`);

    for (const [field, students] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
