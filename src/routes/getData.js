const express = require("express");
const router = express.Router();
const { User, Product } = require("../databases/schema");
const { findAllProducts } = require("../databases/querys");
const { json } = require("body-parser");

router.get("/:data", async (req, res) => {
  const datas = JSON.parse(req.params.data);
  console.log(datas);
  const resolut = [await Product.findById(datas, (e) => e)];

  //await findAllProducts((products) => {
  //  for (let i = 0; i < datas.length; i++) {
  //console.log(resolut);
  //  }
  //});
  res.render("cartData", {
    layout: false,
    userId: null,
    products: resolut,
  });
});

module.exports = router;
