const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Products");
const User = require("../models/userSchema");
const Cart = require("../models/Cart");

// Utility function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new order
router.post("/", async (req, res, next) => {
  try {
    const { userId, items } = req.body;
    if (!userId || !items || !items.length) {
      return res.status(400).json({ message: "User ID and items are required." });
    }

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Validate products and calculate total price
    const itemsValidation = items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found for ID: ${item.product}`);
      }
      if (item.quantity > product.stock) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }
      return product.price * item.quantity;
    });

    const totalPrices = await Promise.all(itemsValidation);
    const total = totalPrices.reduce((sum, price) => sum + price, 0);

    // Deduct stock for products
    await Promise.all(
      items.map((item) =>
        Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
      )
    );

    // Create and save the order
    const newOrder = new Order({ user: userId, items, total });
    const savedOrder = await newOrder.save();

    // Clear user's cart
    await Cart.deleteMany({ user: userId });

    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    next(error);
  }
});

// Fetch all orders
router.get("/get", async (req, res, next) => {
  try {
    const orders = await Order.find();
    console.log(orders);
    const populatedOrders = await Order.find().populate("user", "username email").populate("items.product", "name price");
    res.status(200).json({ success: true, data: populatedOrders });
  } catch (error) {
    next(error);
  }
});

// Fetch orders for a specific user
router.get("/user", async (req, res, next) => {
  try {


    const orders = await Order.find({ user:req.session.userId})
      .populate("user", "username email")
      .populate("items.product", "name price");

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
});

// Fetch a single order by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});

// Update order status
router.post("/:id/status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user", "username email");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    next(error);
  }
});

// Delete an order
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Global error handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

module.exports = router;
