const express = require('express');
const app = express();
app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', price: 85000, stock: 10 },
  { id: 2, name: 'Mouse', price: 1500, stock: 50 },
  { id: 3, name: 'Keyboard', price: 3000, stock: 30 }
];

app.get('/', (req, res) => {
  res.json({ service: 'Product Service', status: 'running' });
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).json({ error: 'Not found' });
});

app.listen(3002, () => console.log('Product Service running on port 3002'));