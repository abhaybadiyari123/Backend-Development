const express = require('express');
const app = express();

app.get('/welcome', (req, res) => {
  const user = req.query.user;
  const role = req.query.role;
  res.send(`Welcome ${user}, your role is ${role}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
