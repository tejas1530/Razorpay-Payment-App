import { instance } from "../server.js";
import crypto from 'crypto'
import { payment } from "../models/paymentGateWay.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), 
      currency: "INR",
      
    };
    const order = await instance.orders.create(options);
    
       res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error.message,
      
  })
  }
};


export const paymentVerification = async (req, res) => {
 try {
  const {razorpay_order_id ,razorpay_payment_id , razorpay_signature }=req.body



  const body=razorpay_order_id + "|" + razorpay_payment_id;

  
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_API_SECRET)
                                  .update(body.toString())
                                  .digest('hex');
                  const isAuthenticated=expectedSignature===razorpay_signature;
                  if (isAuthenticated) {
                    
                      await payment.create({
                        razorpay_order_id ,
                        razorpay_payment_id ,
                         razorpay_signature ,
                      })




                    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)




                  }else{
                    res.status(400).json({
                      success: false,
                      
                    });
                  }
  

  
 } catch (error) {
  return res.status(400).json({
    success:false,
    message:error.message,
    
})
 }
};
