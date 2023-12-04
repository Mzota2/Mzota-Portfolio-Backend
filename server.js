const express = require('express');
const connectDB = require('./DB/DB');
const app = express();
const dotenv = require('dotenv').config();
const domRoutes = require('./Routes/DOMRoutes');
const userRoutes = require('./Routes/USERRoutes');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { refreshToken } = require('./JWT/JWT');

//app middleware
app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000','http://localhost:3001', 'https://mzota-portfolio-backend.onrender.com'],
    credentials:true
}));

app.get('/portfolio/uploads/:filename',(req, res)=>{
    const {filename} = req.params;
    res.sendFile(path.resolve(`uploads/${filename}`));
});

app.use(cookieParser());

app.use('/portfolio/user/refresh', refreshToken);

app.use('/', domRoutes);

app.use('/', userRoutes);




const port = process.env.PORT;
connectDB();
app.listen(port, ()=>{
    console.log('Listening to port '+ port);
})