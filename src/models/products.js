import mongoose from "mongoose";
const productsSchema = new mongoose.Schema(
  {
    title: String,
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
    seller_name: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    seller_phone: String,
  },

  {
    timestamps: true,
  }
);

productsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "seller",
    select: "firstname lastname phone email address gender",
  });
  next();
});

const products = mongoose.model("products", productsSchema);

export default products;
