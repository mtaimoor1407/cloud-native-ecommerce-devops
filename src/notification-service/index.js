const express = require('express');
const app = express();
app.use(express.json());

const notifications = [];

app.get('/', (req, res) => {
  res.json({ service: 'Notification Service', status: 'running' });
});

app.post('/notify', (req, res) => {
  const { userId, message, type } = req.body;
  const notification = {
    id: notifications.length + 1,
    userId,
    message,
    type: type || 'email',
    sentAt: new Date().toISOString()
  };
  notifications.push(notification);
  console.log(`Notification sent to user ${userId}: ${message}`);
  res.status(201).json({ success: true, notification });
});

app.get('/notifications', (req, res) => {
  res.json(notifications);
});

app.listen(3004, () => console.log('Notification Service running on port 3004'));