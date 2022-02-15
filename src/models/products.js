import mongoose from "mongoose";
const productsSchema = new mongoose.Schema(
  {
    ProductName: String,
    description: String,
    available_quantity: String,
    image: [
      {
        type: String,
      },
    ],
    posted_date: String,
    expired_date: String,
    price: String,
    seller_phone: String,
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",

    },
  },

  
  {
    timestamps: true,
  }
);

productsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "seller",
    select: "firstName lastName phone email address gender",
  });
  next();
});

const products = mongoose.model("products", productsSchema);

export default products;
