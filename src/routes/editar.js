const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  findCardapioByIde,
  updateCardapio,
} = require("../databases/querys");

const {
  checkNotAuthenticated,
} = require("../auth/passport-config");

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));

router
  .route("/:id")
  .get(checkNotAuthenticated, async (req, res) => {
    const id_cardapio = req.params.id;
    await findCardapioByIde(id_cardapio, (cardapio_para_editar) => {
      res.render("editar", {
        userId: req.session.passport.user,
        title: "Editar",
        cardapio: cardapio_para_editar,
      });
    });
  })
  .post(checkNotAuthenticated, async (req, res) => {
    updateCardapio(req, (next) => {
      res.redirect("/cardapio");
    });
  });

module.exports = router;
