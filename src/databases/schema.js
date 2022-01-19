const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const cadapioSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
    },
    platform: {
      type: String,
    },
    condition: {
      type: String,
    },
    house: {
      type: String,
    },
    price: {
      type: String,
    },
    
    seller: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", usersSchema);
const Cadapio = mongoose.model("product", cadapioSchema);

module.exports = {
  User,
  Cadapio,
};
