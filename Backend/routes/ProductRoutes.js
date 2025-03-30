const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Products');
const upload = require('../utilits/upload');
const router = express.Router();



// Utility function for error handling
const handleError = (res, error, message = "An error occurred") => {
  res.status(500).json({ error: message, details: error.message });
};

// Add a new product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, category, description, price, isAvailable, isPopular, averageRating } = req.body;
    const images = req.files.map(file => file.path); // Extract image URLs

    const newProduct = new Product({
      name,
      category,
      description,
      price,
      isAvailable,
      images,
      isPopular,
      averageRating,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    handleError(res, error, 'Failed to add product');
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('reviews'); // Populate reviews
    res.status(200).json(products);
  } catch (error) {
    handleError(res, error, 'Failed to fetch products');
  }
});

// Get popular products
router.get('/best', async (req, res) => {
  try {
    const products = await Product.find({ isPopular: true }).populate('reviews');
    res.status(200).json(products);
  } catch (error) {
    handleError(res, error, 'Failed to fetch popular products');
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username',
      },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    handleError(res, error, 'Failed to fetch product');
  }
});

// Update a product by ID
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { name, category, description, price, isAvailable, isPopular } = req.body;
    const images = req.files.map(file => file.path); // Extract image URLs if new images are uploaded

    const updateData = {
      name,
      category,
      description,
      price,
      isAvailable,
      isPopular,
    };

    if (images.length > 0) {
      updateData.images = images; // Update images only if new ones are provided
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    handleError(res, error, 'Failed to update product');
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    handleError(res, error, 'Failed to delete product');
  }
});

// Mark a product as popular
router.patch('/:id/popular', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isPopular: true }, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product marked as popular', product });
  } catch (error) {
    handleError(res, error, 'Failed to mark product as popular');
  }
});


router.post('/:id', async (req, res) => {
  const {isAvailable}=req.body;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id);
    product.isAvailable=isAvailable;
    await product.save();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product marked as popular', product });
  } catch (error) {
    handleError(res, error, 'Failed to mark product as popular');
  }
});
// Sort products by price

module.exports = router;
