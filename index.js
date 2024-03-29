require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoute');

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/', userRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Could not connect to MongoDB", error));



app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})