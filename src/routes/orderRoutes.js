import express from "express";
import orderController from "../controllers/orderController"
import verfyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/verifyToken";


 

const orderRouter = express.Router(); 
orderRouter.post("/:id", verifyToken, verfyAccess("buyer"), orderController.createOrder)
orderRouter.get("/all/product/:id", verifyToken, verfyAccess("seller"), orderController. getAllOrderbyproductId)
orderRouter.patch("/status/:id", verifyToken, verfyAccess("seller"), orderController.changeOrderStatus)
// orderRouter.get("/all/orders", orderController.getAllOrders)
orderRouter.get("/:id",orderController.getOneOrder)
orderRouter.patch("/all", verifyToken, verfyAccess("admin"), orderController.patchallOrder)
orderRouter.get("/allClientOder", verifyToken, verfyAccess("seller"), orderController. getAllClientOrder)



export default orderRouter;