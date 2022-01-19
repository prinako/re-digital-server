const express = require("express");
const router = express.Router();
const { findProductByIde } = require("../databases/querys");

router.use(express.static("public"));

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const userInfo = req.user;

  findProductByIde(id, (result) => {
    if (userInfo) {
      return res.render("product", {
        userId: userInfo,
        product: result,
        title: "Product",
      });
    }
    res.render("product", { userId: null, product: result, title: "Product" });
  });
});

module.exports = router;
