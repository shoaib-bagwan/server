const mongoose = require('mongoose');
const oldCars = mongoose.Schema({
    carImage: [
        {
            main: String,
            i1: String,
            i2: String,
            i3: String,
            i4: String,
        }
    ],
    carName: { type: String, required: true },
    carModel: { type: Number, required: true },
    carCompany: { type: String, required: true },
    sittingCapacity: { type: Number, required: true },
    gearBox: { type: String, default: 5 },
    ownerNumber: { type: Number, required: true },
    transmission: { type: String, enum: ['Automatic', 'Manual'], default: 'Manual', required: true },
    fuel: { type: String, default: 'Petrol', required: true },
    price: { type: String },
    isAccident: { type: Boolean, default: false },
    color: { type: String },
    paperValidTill: { type: String },
    carType: { type: String, default: "Old" }
});
module.exports = mongoose.model("OldCars", oldCars)