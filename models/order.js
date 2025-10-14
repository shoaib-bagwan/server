const mongoose = require('mongoose');

const Order = mongoose.Schema({
  status:{type:String,enum:["Processing","Completed","Cancelled","Cancelled by Admin","Cancelled by User"],default:"Processing"},
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress:{type:String,required:true},
  totalAmount: { type: Number },
  cars: [{
    carName: { type: String },
    carCompany: { type: String },
    carQuantity: { type: Number, default: 1 },
    carModel: { type: Number },
    gearBox: { type: String, default: "5" },
    engine: { type: String  },
    transmission: { type: String, enum: ["Automatic", "Manual"], default: "Manual", required: true },
    fuel: { type: String, default: "Petrol", required: true },
    quantity: { type: Number },
    totalPrice: { type: Number },
    carType:{type:String,enum:["New","Old"],default:"New" ,required:true}
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", Order);
