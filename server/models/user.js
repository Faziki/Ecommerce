const mongoose = require("mongoose");
const { timeStamp } = require("node:console");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    index: true,
  },
  roles: {
    type: String,
    default: "subscriber",
  },
  cart: {
    type: Array,
    default: [],
  },
  address: String,
  wishlist: [{ type: ObjectId, ref: "Product" }],
},
{timestamps= true}
);

module.exports = mongoose.model('User', userSchema)
