const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'mySecretKey', 
  resave: false, 
  saveUninitialized: true, 
  cookie: { maxAge: 60000 } 
}));

app.get('/login', (req, res) => {
  req.session.username = 'JohnDoe';
  res.send('Session started for ' + req.session.username);
});

app.get('/profile', (req, res) => {
  if (req.session.username) {
    res.send('Welcome ' + req.session.username);
  } else {
    res.send('Please log in first.');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Error destroying session');
    res.send('Session destroyed successfully');
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
