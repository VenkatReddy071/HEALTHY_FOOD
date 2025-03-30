const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Products');
const router = express.Router();

/**
 * Utility function to handle errors
 */
const handleError = (res, error, message) => {
  console.error(error);
  res.status(500).json({ error: message });
};


router.get("/low-high", async (req, res) => {
  try {
    const order = req.query.order;
    console.log(req.query)
    const validOrders = ["asc", "desc"];
    if (!order || !validOrders.includes(order.toLowerCase())) {
      return res.status(400).json({ error: "Invalid 'order' parameter. Use 'asc' or 'desc'." });
    }

    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
    const products = await Product.find().sort({ price: sortOrder });
    res.status(200).json(products);
  } catch (error) {
    handleError(res, error, 'Failed to sort products by price');
  }
});

/**
 * Route: GET /rating
 * Description: Get products sorted by rating in descending order
 */
router.get("/rating", async (req, res) => {
  try {
    const products = await Product.find().sort({ averageRating: -1 });
    res.status(200).json(products);
  } catch (error) {
    handleError(res, error, 'Failed to fetch products by rating');
  }
});

/**
 * Route: GET /ratingBase
 * Description: Filter products by minimum rating
 * Query Params:
 *   - minRating: Minimum rating to filter products (numeric)
 */
router.get("/ratingBase", async (req, res) => {
  try {
    const { minRating } = req.query;
    console.log(req.query)
    if (!minRating || isNaN(minRating)) {
      return res.status(400).json({ error: "Invalid or missing 'minRating' query parameter." });
    }

    const minRatingValue = parseFloat(minRating);
    const products = await Product.find({ averageRating: { $gte: minRatingValue } });
    res.status(200).json(products);
  } catch (error) {
    handleError(res, error, 'Failed to filter products by minimum rating');
  }
});

module.exports = router;
