const express = require('express');
const app= express();
const port = 5000;
const cors = require('cors')
app.use(express.json());

app.use(express.urlencoded());
app.use(cors());

app.use('/images',express.static('images'))

const userRoute=require('./routes/users');
require('./config/db');
const path = require('path');
require('dotenv').config({
    path:path.join(__dirname,'.env')
});
app.use('/user',userRoute)





app.listen(port,()=>{
    console.log(`server running at port http://localhost:${port}`);
})