const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  telephone: Number,
  password: String,
  role: String,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: "Việt Nam",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
