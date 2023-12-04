const express = require('express');
require('dotenv').config();
const app =express();
const mongoose = require('mongoose')
const cors = require('cors');
const userRoutes = require('./routes/userRoute')

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(process.env.PORT);
        console.log("Connected to db");
    })
})
.catch((error)=>{
    console.log(error);
})

app.use('/user',userRoutes)