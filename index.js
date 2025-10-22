const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const path=require('path')
const app=express();
require('dotenv').config();
const carsRoutes=require('./routes/carsRouts');
const oldCarsRoutes=require('./routes/oldCarsRouts');
const orderRoutes=require('./routes/orderRouts');
const userRoutes=require('./routes/usercrud');
const logoRouts=require('./routes/logoRouts')

// middleware
app.use(cors());
app.use(express.json());

// DB
const MONGO_URL=process.env.MONGO_URL || "mongodb+srv://shoaibbagwan727_db_user:SI6MFUHP8GppBPiF@cluster0.ybasesk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || "mongodb://localhost:27017/Project";
mongoose.connect(MONGO_URL,{ })
.then(()=>{console.log("MongoDB connected")})
.catch((e)=>{console.log(e)})

// Mounting
app.use('/api/oldcars',oldCarsRoutes)
app.use('/api/users',userRoutes);
app.use('/api/cars',carsRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/logos',logoRouts);

app.get('/',(req,res)=>{
    res.status(200).json({message:"API IS RUNNING"})
})
app.use(express.static(path.join(__dirname, "../client/My-Project/dist/")));

// start
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server is running on port no ${PORT}`)
});

// userCrud Api==========================

// /login
// /register
// /showalluser

// carsRouts Api=========================

// /addcars
// 

// orderRouts Api========================

