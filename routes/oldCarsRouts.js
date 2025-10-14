const oldCars = require('../models/oldcars');
const express = require('express');
const router = express.Router();
router.post('/add-old-car', async (req, res) => {
    try {
        const { carImage, carName, carModel, carCompany, sittingCapacity, gearBox, ownerNumber, transmission, fuel, price,isAccident,paperValidTill,color,carType } = req.body;
        const oldCar = new oldCars({
            carImage,
            carName,
            carModel,
            carCompany,
            sittingCapacity,
            gearBox,
            ownerNumber,
            transmission,
            fuel,
            price,
            isAccident,
            color,
            paperValidTill,
            carType,
        });
        const savedCar = await oldCar.save();
        if (savedCar) {
            res.status(201).json({ message: "data inserted successfully" })
        } else {
            res.status(404).json({ message: "car data not found" })
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

// getting car details
router.get('/all-old-cars', async (req, res) => {
    try {
        const carsInfo = await oldCars.find({});
        if (carsInfo) {
            res.status(200).send(carsInfo);
        } else {
            res.status(404).json("no cars data available")
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const id=req.params.id;
        const carsInfo = await oldCars.findById(id);
        if (carsInfo) {
            res.status(200).send(carsInfo);
        } else {
            res.status(404).json("no cars data available")
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

// get old car by name
router.get('/name/:carName', async (req, res) => {
    try {
        const carName=req.params.carName;
        const carsInfo = await oldCars.find({carName:{ $regex: new RegExp(`^${carName}$`, "i") }});
        if (carsInfo) {
            res.status(200).send(carsInfo);
        } else {
            res.status(404).json("no cars data available")
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

// get old car by company name
router.get('/company/:carCompany', async (req, res) => {
    try {
        const carCompany=req.params.carCompany;
        const carsInfo = await oldCars.find({carCompany:{ $regex: new RegExp(`^${carCompany}$`, "i") }});
        if (carsInfo) {
            res.status(200).send(carsInfo);
        } else {
            res.status(404).json("no cars data available")
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

// get old car by fuel
router.get('/fuel/:fuel', async (req, res) => {
    try {
        const fuel=req.params.fuel;
        const carsInfo = await oldCars.find({fuel:{ $regex: new RegExp(`^${fuel}$`, "i") }});
        if (carsInfo) {
            res.status(200).send(carsInfo);
        } else {
            res.status(404).json("no cars data available")
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

// PUT /api/oldcars/update/:id
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCar = await oldCars.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (updatedCar) {
            res.status(200).json(updatedCar);
        } else {
            res.status(404).json({ message: "Car not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
// delete car by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteCar = await oldCars.findByIdAndDelete(id);

        if (deleteCar) {
            res.status(200).json(deleteCar);
        } else {
            res.status(404).json({ message: "Car not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


module.exports = router;