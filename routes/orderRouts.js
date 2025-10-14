const Orders = require('../models/order');
const express = require('express');
const router = express.Router();

// Add a new order
router.post('/addorders', async (req, res) => {
  try {
    const { customerName, customerEmail, status, customerAddress, cars } = req.body;

    if (!customerName || !customerEmail || !customerAddress || !cars || cars.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const mappedCars = cars.map(car => {
      const priceNumber = Number(car.price) || 0;
      const quantity = Number(car.quantity) || 1;
      return {
        // carImage:car.carImage.main,
        carName: car.carName,
        carCompany: car.carCompany,
        carQuantity: quantity,
        carModel: car.carModel,
        gearBox: car.gearBox,
        engine: car.engine,
        transmission: car.transmission,
        fuel: car.fuel,
        carType: car.carType,
        totalPrice: priceNumber * quantity
      };
    });

    const totalAmount = mappedCars.reduce((sum, car) => sum + car.totalPrice, 0);
    const newOrder = new Orders({
      status,
      customerName,
      customerEmail,
      customerAddress,
      totalAmount,
      cars: mappedCars

    });

    const savedOrder = await newOrder.save(); // ✅ await is important

    res.status(201).json({ message: "Order saved successfully", order: savedOrder });
  } catch (e) {
    console.error("Error saving order:", e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
});


// Get all orders (Admin)
router.get('/admin/orders', async (req, res) => {
  try {
    const allOrders = await Orders.find({});
    if (allOrders) {
      res.status(200).json(allOrders);
    } else {
      res.status(404).json({ message: "No orders available" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get orders by user
router.get('/history/:customerEmail', async (req, res) => {
  try {
    const customerEmail = req.params.customerEmail;
    const allOrders = await Orders.find({ customerEmail: customerEmail });
    if (allOrders) {
      res.status(200).json(allOrders);
    } else {
      res.status(404).json({ message: "No orders available" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get orders by user
router.get('/order/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const allOrders = await Orders.findById(id);
    if (allOrders) {
      res.status(200).json(allOrders);
    } else {
      res.status(404).json({ message: "No orders available" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Update order by ID
router.put('/update-order/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedOrder = await Orders.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (updatedOrder) {
      res.status(200).json({
        message: "Order updated successfully",
        order: updatedOrder,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
