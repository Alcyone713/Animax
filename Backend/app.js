const express = require("express");
const mongoose = require("mongoose")
const cors= require("cors")
require("./Models/User.js")

require('dotenv').config()

const app = express();
app.use(cors())
const PORT = 5000;
mongoose.model("User")

app.use(express.json());
app.use(require('./Routes/auth.js'))
app.use(require('./Routes/lists.js'))

mongoose.connect(process.env.MONGOURI);
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
})
mongoose.connection.on('error', (err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log("App is running")
})
