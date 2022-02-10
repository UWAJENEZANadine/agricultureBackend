import orderInfo from "../models/order";
import productInfos from "../models/products";
import * as sendSms from "../helpers/sendSms";
class orderController {
  static async createOrder(req, res) {
    const product = await productInfos.findById(req.params.id);

    const Order = await orderInfo.create({
      buyer: req.user._id,
      product: req.params.id,
      quantity: req.body.quantity,
    });

    
    if (!Order) {
      return res.status(404).json({ error: "order not registered" });
    }

    sendSms.sendSmsToSeller(
      req.user.lastName,
      req.user.phone,
      product.productname,
      req.body.quantity,
      product.seller.phone
    );

    return res
      .status(200)
      .json({ message: "order created successfully", data: Order });
  }

  static async getAllOrderbyproductId(req, res) {
  
    const Order = await orderInfo.find({ product: req.params.id});
    if (!Order) {
      return res.status(400).json({ error: "Order not registerd" });
    }
    return res.status(200).json({ message: "order is found", data: Order });
  }

  static async getAllOrdersbySellerId(req, res) {
    const Order = await orderInfo.find({ user: req.user.id });
    if (!Order) {
      return res.status(400).json({ error: "you are not able to access this" });
    }
    return res.status(200).json({ message: "order is found", data: Order });
  }

  static async getOneOrder(req, res) {
    const Order = await orderInfo.findById(req.params.id);
    if (!Order) {
      return res.status(400).json({ error: "Order not registerd" });
    }
    return res.status(200).json({ message: "order is found", data: Order });
  }

  
  //get all client who order product

  static async getAllClientOrder(req, res) {
  
    const Order = await orderInfo.find();
    if (!Order) {
      return res.status(400).json({ error: "not yet ordered" });
    }
    return res.status(200).json({ message: "ordered product retrieved", data: Order });
  }



  static async patchallOrder(req, res) {
    const Order = await orderInfo.findByIdAndDelete(req.params.id);
    if (!Order) {
      return res.status(400).json({ error: "Order not updated" });
    }

    return res.status(200).json({ message: "Order is updated", data: Order });
  }
  
  static async changeOrderStatus(req, res) {
    const {status} = req.body;
    
    const order = await orderInfo.findByIdAndUpdate(req.params.id, { status: status },{ new: true });
    if (!order) {
      return res.status(400).json({ error: "failed to update status" });
    }
    console.log(order)
    sendSms.sendSmsToBuyer(
      order.buyer.firstName,
      order.product.productname,
      order._id,
      order.buyer.phone
    );
    return res.status(200).json({ message: "success", data: order });
  }
}


export default orderController;
