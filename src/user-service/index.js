const express = require('express');
const app = express();
app.use(express.json());

// In-memory users (no real DB needed for this project)
const users = [
  { id: 1, name: 'Ali Hassan', email: 'ali@example.com' },
  { id: 2, name: 'Sara Khan', email: 'sara@example.com' }
];

app.get('/', (req, res) => {
  res.json({ service: 'User Service', status: 'running' });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.listen(3001, () => console.log('User Service running on port 3001'));