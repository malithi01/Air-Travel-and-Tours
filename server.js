const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 8000;
const DB_URL = 'mongodb+srv://malithi01:travel01@airtravel.n87cr.mongodb.net/airTravel?retryWrites=true&w=majority';

mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUniFiedTopology: true
})
.then(() => {
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error', err));


app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});