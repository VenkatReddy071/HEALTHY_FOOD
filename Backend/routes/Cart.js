const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Adjust the path as needed
const Product = require('../models/Products'); // To validate product existence
const isAuthenticated = require('../MiddleWare'); // Authentication middleware


router.get('/', isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.session.userId }).populate('items.product', 'name images price');
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
  }
});

router.post('/', isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.session.userId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({ user: req.session.userId, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      // Update quantity if product is already in the cart
      existingItem.quantity += quantity;
      existingItem.price = product.price * existingItem.quantity;
    } else {
      // Add new item to the cart
      cart.items.push({
        product: product._id,
        name: product.name,
        images: product.images[0],
        quantity,
        price: product.price * quantity,

      });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
  }
});

// @route   PUT /api/cart/:itemId
// @desc    Update item quantity in the cart
router.put('/:itemId', isAuthenticated, async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.session.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    item.price = item.quantity * item.price / item.quantity; // Update price based on new quantity

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item', details: error.message });
  }
});

// @route   DELETE /api/cart/:itemId
// @desc    Remove an item from the cart
router.delete('/:itemId', isAuthenticated, async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.session.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item', details: error.message });
  }
});

// @route   DELETE /api/cart
// @desc    Clear the cart
router.delete('/', isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.session.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart', details: error.message });
  }
});

module.exports = router;
