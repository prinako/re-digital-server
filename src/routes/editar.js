const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  findUser,
  criaNovoUsario,
  postCadapio,
  todosOsReclameAqui,
  todosOscardpio,
  crioFeedback,
  crioReclamaAqui,
  findCardapioByIde,
  updateCardapio,
} = require("../databases/querys");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/passport-config");

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));


router
  .route("/:id")
  .get(checkNotAuthenticated, async (req, res) => {

    const id_cardapio = req.params.id;
    await findCardapioByIde(id_cardapio, (cardapio_para_editar) => {
        console.log(cardapio_para_editar)
        res.render("editar", {
        userId: req.session.passport.user,
        title: "Editar",
        cardapio: cardapio_para_editar,
      });
    });
  })
  .post( checkNotAuthenticated, async (req, res) => {
    console.log(req.params.id)
    updateCardapio(req, (next)=>{
        res.redirect("/cardapio")
    })

  });

  module.exports = router;