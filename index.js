import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productsroute from "./src/routes/productsroute"
import userRoutes from "./src/routes/userRoutes";
import orderRouter from "./src/routes/orderRoutes"
import cors from "cors"


dotenv.config({path:"./.env"})
const app = express();
app.use(cors())

 	

 	
app.use(bodyParser.json());

app.use("/products",productsroute);




app.use("/user",userRoutes);
app.use("/order", orderRouter)

 	

 	
app.use("/", (req, res) => res.status(200).json({

 	
   message:"This is Agriculture APi"

 	
}));
const dbUrl =process.env.DATABASEURL;
mongoose.connect(dbUrl).then(()=>console.log("database connected successfull"));

 	
const port =process.env.PORT;
 	
app.listen(port, () => {
 console.log(`Server is running on Port ${port}`);

 	
});

 	

 	
export default app;