const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login").ensureLoggedIn;

const {
  findUser,
  criaNovoUsario,
  updateProfile,
  findAllCadapios,
} = require("../databases/querys");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/passport-config");

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));
const ensureLoggedIn = ensureLogin();

//RENDING LOG IN PAGE
router.route("/").get((req, res) => {
  res.redirect("login");
});

router.get("/admin",checkNotAuthenticated, (req, res) => {
  console.log(req);
  res.render("admin", { userId: req.session.passport.user, title: "Sell Now" });
});

router
  .route("/sell-now")
  .get(ensureLoggedIn, (req, res) => {
    res.render("seller", {
      userId: req.session.passport.user,
      title: "Sell Now",
    });
  })

  .post(ensureLoggedIn, async (req, res) => {
    postProduct(req, (doc) => {
      res.redirect("sell-now");
    });
  });

router
  .route("/login")
  .get(checkAuthenticated,(req, res) => {
    console.log(req._passport)
    res.render("login", { userId: null, title: "Login" });
  })
  //LOGING IN
  .post(
    passport.authenticate("local-login", {
      successRedirect: "/admin",
      failureRedirect: "login",
      failureFlash: true,
    })
  );

//RENDING REGISTER PAGE
router
  .route("/signup")
  .get(checkAuthenticated,(req, res) => {
    res.render("register", { title: "Sign Up" });
  })
  //REGISTER FOR AN ACCOUNT
  .post(async (req, res) => {
    const verifyUserExist = await findUser(req.body);
    if (verifyUserExist !== null) {
      res.render("register", {
        inform: "Voce já tem uma conta. Tente fazer log in",
        title: "Crio conta",
      });
      return;
    }
    try {
      await criaNovoUsario(req.body);
      res.redirect("login");
    } catch (err) {
      console.log(err);
      res.render("register", {
        inform: err,
        title: "Crio conta",
      });
    }
  });

router.get("/logout",checkNotAuthenticated, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

//EXPORTING Router MODULE
module.exports = router;
