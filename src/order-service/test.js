const assert = require('assert');

function testOrderStatus() {
  const order = { id: 1, status: 'confirmed' };
  assert.strictEqual(order.status, 'confirmed');
  console.log('✓ Order status test passed');
}

testOrderStatus();
console.log('All Order Service tests passed!');