const Cars = require('../models/cars');
const express = require('express');

const router=express.Router();
router.post('/add-car', async (req, res) => {
    try {
        const { carImage, carName, carModel,quantity, carCompany, sittingCapacity, gearBox, engine, transmission, fuel, price,mileage,color,carType} = req.body;
        const newCar = new Cars({
            carImage,
            carName,
            carModel,
            carCompany,
            sittingCapacity,
            gearBox,
            engine,
            transmission,
            fuel,
            mileage,
            quantity,
            color,
            price,
            carType,
        });
        const savedCar = await newCar.save();
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
router.get('/all-cars', async (req, res) => {
    try {
        const carsInfo = await Cars.find({});
        if (carsInfo) {
            res.status(200).send(carsInfo);
        } else {
            res.status(404).json("no cars data available")
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

// getting cars by name 
router.get('/new-name/:carName', async (req, res) => {
    try {
        var name = req.params.carName;
        const carInfo = await Cars.find({ carName: name });
        if (carInfo) {
            res.status(200).send(carInfo);
        } else {
            res.status(404).json({ message: "car not found" });
        }
    } catch (e) {
        res.status(500).send(e);
    }

});
// update by car name and model;
router.put('/update/:id', async (req, res) => {
    try {
        const updatedCar = await Cars.findByIdAndUpdate(req.params.id,req.body, { new: true });
        if (updatedCar) {
            res.status(200).json({ message: "data updated successfully" })
        } else {
            res.status(404).json({ message: "data not updated" });
        }
    } catch (e) {
        res.status(500).send(e);
    }
});
// getting using company name
router.get('/new-company/:carCompany', async (req, res) => {
    try {
        let carCompany = req.params.carCompany;
        const carInfo = await Cars.find({ carCompany: carCompany });
        if (carInfo) {
            res.status(200).send(carInfo);
        } else {
            res.status(404).json({ message: "no cars found" });
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

// deleting car by name and model
router.delete('/delete/:carName/:carModel', async (req, res) => {
    try {
        let carName = req.params.carName;
        let carModel = req.params.carModel;
        const deletedCar=await Cars.findOneAndDelete({carModel:carModel,carName:carName});
        if(deletedCar){
            res.status(200).json({message:"car data deleted successfully"})
        }else{
            res.status(404).json({message:" Sorry! car data not deleted"})
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
});
router.delete('/delete/:id',async (req,res) => {
    try{const deleteData= await Cars.findByIdAndDelete(req.params.id)
    if(deleteData){
        res.status(200).json({message:"Data Deleted"})
    }else{
        res.status(404).json({message:"Data Not Deleted"})
    }}catch(e){
        res.status(500).send(e)
    }
});
router.get('/new-id/:id',async(req,res)=>{
    try{
        var id=req.params.id;
        const carInfo = await Cars.findById(id)
        if(carInfo){
            res.status(200).send(carInfo);
        }
        else{
            res.status(404).send(carInfo)
        }
    }catch(e){
        res.status(500).send(e)
    }
})
module.exports=router;

// var port = 8000;
// app.listen(port, () => {
//     console.log("server is running on port no ", port)
// })
