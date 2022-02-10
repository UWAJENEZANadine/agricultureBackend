import mongoose from "mongoose";
const agricultureSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref:"User",
    },

    

    product: {
      type: mongoose.Schema.ObjectId,
      ref: "products",
    },
    quantity: Number,
    status: {
      type: String,

      enum: ["pending", "accepted", "declined", "canceled"],

      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);
agricultureSchema.pre(/^find/, function (next) {
  this.populate({
    path: "buyer",
    select: "firstName lastName phone email address gender",
  }).populate({
    path: "product",
    select:"productname"
  });
  next();
});
const Order = mongoose.model("order", agricultureSchema);

export default Order;
