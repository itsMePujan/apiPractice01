const { string } = require("joi");
const mongoose = require("mongoose");

const userSchemaDef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    image: { type: String },
    address: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: { type: String },
    token: String,
    resetToken: String,
    resetExpiry: { type: Date },
  },
  {
    //created
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const UserModel = mongoose.model("User", userSchemaDef);

module.exports = UserModel;
