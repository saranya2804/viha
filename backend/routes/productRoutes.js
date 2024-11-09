const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('id name price image description');
    res.json(products);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching products', error: err });
  }
});

// Search products by name
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send({ message: 'Search query is required' });
  }

  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
    }).select('id name price image description');

    res.json(products);
  } catch (err) {
    res.status(500).send({ message: 'Error searching products', error: err });
  }
});

module.exports = router;
