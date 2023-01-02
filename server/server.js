import { app } from "./app.js";

import Razorpay from 'razorpay'



import { connectDataBase } from "./config/database.js";



connectDataBase();


export const  instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_API_KEY,
    key_secret: process.env.RAZOR_PAY_API_SECRET,
  });
app.listen(process.env.PORT,()=>console.log(`server is working on ${process.env.PORT}`))