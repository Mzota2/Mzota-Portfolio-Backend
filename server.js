const express = require('express');
const connectDB = require('./DB/DB');
const app = express();
const dotenv = require('dotenv').config();
const domRoutes = require('./Routes/DOMRoutes');
const cors = require('cors');
const path = require('path');

//app middleware
app.use(express.json());
app.use(cors());

app.get('/portfolio/uploads/:filename',(req, res)=>{
    const {filename} = req.params;
    res.sendFile(path.resolve(`uploads/${filename}`));
});

app.use('/', domRoutes);



const port = process.env.PORT;
connectDB();
app.listen(port, ()=>{
    console.log('Listening to port '+ port);
})