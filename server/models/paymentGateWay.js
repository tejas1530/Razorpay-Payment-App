import mongoose from 'mongoose';

const paymentschema = new mongoose.Schema({

    razorpay_order_id:{
        type:String,
        required:true,
        trim: true,
    } , 
    razorpay_payment_id :{
        type:String,
        required:true,
        trim: true, 
    },
     razorpay_signature :{
        type:String,
        required:true,
        trim: true,
     },


});



export const payment = mongoose.model("payment",paymentschema)