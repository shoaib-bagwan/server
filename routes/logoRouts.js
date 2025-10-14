const express = require('express')
const Logos = require('../models/logos')
const mongooes = require('mongoose')
const app = express();
const router = express.Router();
router.get('/logos', async (req, res) => {
    try {
        const allLogos = await Logos.find({})
        if (allLogos) {
            res.status(200).send(allLogos);
        } else {
            res.status(404).json({ message: "no logo available" })
        }
    } catch (e) {
        res.status(500).send(e)
    }
});
router.post('/Addlogos',async (req,res) => {
    try{const {imageSrc,logoName}=req.body;
    const newLogo=new Logos({
        imageSrc,
        logoName
    })
    const savedLogo=await newLogo.save();
    if(savedLogo){
        res.status(201).json({message:"Logo Inserted Successfully"})
    }else{
        res.status(404).json({message:"logo not inserted"})
    }}catch(e){
        res.status(500).send(e.message)
    }

},)
module.exports=router