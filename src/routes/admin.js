const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login").ensureLoggedIn;

const { postCadapio, findUser, criaNovoUsario, updateProfile } = require('../databases/querys');
const { checkAuthenticated, checkNotAuthenticated } = require('../auth/passport-config');

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));

const ensureLoggedIn = ensureLogin();

router.get("/", ensureLoggedIn ,(req, res) => {
  res.render('info', { userId: req.user });
});

router.route("/sell-now")
  .get(ensureLoggedIn, (req, res) => {
    res.render("seller", { userId: req.user,  title:"Sell Now" });
  })

  .post(ensureLoggedIn, async (req, res) => {
    postProduct(req, (doc) => {
      res.redirect('sell-now');
    });
  })

module.exports = router;