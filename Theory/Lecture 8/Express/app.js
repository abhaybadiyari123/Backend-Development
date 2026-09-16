const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const students = [
  { id: 1, name: 'Aarav', branch: 'CSE' },
  { id: 2, name: 'Diya', branch: 'ECE' },
  { id: 3, name: 'Rohan', branch: 'IT' }
];

app.get('/', (req, res) => {
  res.render('students', { students });
});

app.get('/about', (req, res) => {
  res.render('about', {
    courseName: 'Backend Development',
    lecturerName: 'Lecturer Name'
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
