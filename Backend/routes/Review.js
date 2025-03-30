const express = require('express');

const Review = require("../models/Review"); // Adjust the path based on your project structure
const Product = require('../models/Products'); // Ensure the product model is also imported if needed
const router = express.Router();
const isAuthenticated=require("../MiddleWare")
// @route   GET /api/reviews/:productId
// @desc    Fetch all reviews for a specific product
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ product: productId }).populate('user', 'username');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
});

// @route   POST /api/reviews/:productId
// @desc    Add a new review for a product
router.post('/:productId',isAuthenticated, async (req, res) => {
  const { productId } = req.params;
  const {rating, comment,user } = req.body;
  console.log(user)
  try {
    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newReview = new Review({
      user:req.session.userId,
      product: productId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review', details: error.message });
  }
});

// @route   PUT /api/reviews/:reviewId
// @desc    Update a review by ID
router.put('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review', details: error.message });
  }
});

// @route   DELETE /api/reviews/:reviewId
// @desc    Delete a review by ID
router.delete('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully', deletedReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review', details: error.message });
  }
});

module.exports = router;
