const express= require("express");
const mongoose = require("mongoose")
const {MONGOURI} = require("./keys.js")

const app=express();
const PORT=5000;

mongoose.connect(MONGOURI);
mongoose.connection.on('connected', ()=>{
    console.log("Connected to MongoDB");
})
mongoose.connection.on('error', (err)=>{
    console.log(err);
})


app.listen(PORT, ()=>{
    console.log("App is running")
})

//TLFUrT87fF98SsG2