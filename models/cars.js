const mongoose = require('mongoose');

const Cars = mongoose.Schema({
    carImage: [
        {
            main: String,
            img1: String,
            img2: String,
            img3: String,
            img4: String,
        }
    ],

    carName: { type: String, required: true },
    carModel: { type: Number, required: true },
    carCompany: { type: String, required: true },
    sittingCapacity: { type: Number, required: true },
    gearBox: { type: String, default: "5" },
    engine: { type: String, required: true },
    transmission: { type: String, enum: ["Automatic", "Manual"], default: "Manual", required: true },
    fuel: { type: String, default: "Petrol", required: true },
    mileage: { type: String },
    quantity: { type: Number },
    color: { type: [String], default: [] },
    price: { type: Number },
    carType:{type:String, default:"New"}
});

module.exports = mongoose.model("Cars", Cars);
