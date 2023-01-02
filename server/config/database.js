import mongoose from "mongoose";

mongoose.set('strictQuery', false);

export const connectDataBase = () =>{
    mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true , family: 4}).then(
        (c)=>{
            console.log(`mongoDB connected to : ${c.connection.host}`);
        }
    ).catch(
        (e)=>{
            console.log(e)
        }
    )
}