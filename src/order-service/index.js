const express = require('express');
const app = express();
app.use(express.json());

const orders = [
  { id: 1, userId: 1, productId: 1, status: 'confirmed', total: 85000 },
  { id: 2, userId: 2, productId: 3, status: 'pending', total: 3000 }
];

app.get('/', (req, res) => {
  res.json({ service: 'Order Service', status: 'running' });
});

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.post('/orders', (req, res) => {
  const order = { id: orders.length + 1, status: 'pending', ...req.body };
  orders.push(order);
  res.status(201).json(order);
});

app.listen(3003, () => console.log('Order Service running on port 3003'));