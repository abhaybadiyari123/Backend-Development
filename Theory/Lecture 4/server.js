const express = require('express');
const app = express();

app.use(express.json());

const students = [
  { id: 1, name: 'Aarav', branch: 'CSE' },
  { id: 2, name: 'Diya', branch: 'ECE' },
  { id: 3, name: 'Rohan', branch: 'IT' }
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
