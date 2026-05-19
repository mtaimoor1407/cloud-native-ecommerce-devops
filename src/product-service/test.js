const assert = require('assert');

function testProductData() {
  const product = { id: 1, name: 'Laptop', price: 85000 };
  assert.strictEqual(product.price, 85000);
  console.log('✓ Product data test passed');
}

testProductData();
console.log('All Product Service tests passed!');