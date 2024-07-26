const express = require('express');
const { errorHandler } = require('./Middleware/errormiddleware');
const dotenv = require('dotenv').config();
const colors = require('colors'); 
const cors = require('cors')
const connectDB = require('./Config/db');
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/users', require('./Routes/routes'));
app.use('/api/users', require('./Routes/userRoute'));
app.use('/admin', require('./Routes/adminRoute'))
app.use(errorHandler)

app.listen(port, ()=>console.log(`Server started on port ${port}`))