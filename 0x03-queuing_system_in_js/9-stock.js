// Import the required libraries
import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

// Create a list of products
const listProducts = [
  {
    itemId: 1, itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4 
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5 },
];

// Function to get item by id
function getItemById(id) {
  return listProducts.find((item) => item.itemId === id);
}

// Create an Express server
const app = express();
const port = 1245;

// Route to get the list of products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// Create a Redis client
const client = createClient();

// Promisify the Redis get method
const getAsync = promisify(client.get).bind(client);



// Function to reserve stock by id
function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

// function that return the reserved for a specific item
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock ? parseInt(stock, 10) : 0;
}

// Route to get product details by itemId
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  const currentQuantity = item.initialAvailableQuantity - await getCurrentReservedStockById(itemId);
  res.json({ ...item, currentQuantity });
});

// Route to reserve a product by itemId
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  const currentStock = item.initialAvailableQuantity - await getCurrentReservedStockById(itemId);
  if (currentStock <= 0) {
    res.json({ status: 'Not enough stock available', itemId });
    return;
  }

  reserveStockById(itemId, item.initialAvailableQuantity - currentStock + 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});