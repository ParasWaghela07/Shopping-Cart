const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');
const router=require('./routes/router');
const dbconnect=require('./config/database');
require('dotenv').config();
const PORT=process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://shopping-cart-ten-liard.vercel.app',
    credentials: true
}));


app.use(router);

dbconnect();

app.listen(PORT,()=>{
    console.log(`APP IS RUNNING ON PORT ${PORT}`)
});



