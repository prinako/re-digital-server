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
} = require("../databases/querys");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/passport-config");

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));

//RENDING LOG IN PAGE
router.route("/").get(checkNotAuthenticated, async (req, res) => {
  await todosOsReclameAqui((reclamaçoes)=>{
    res.render("index", {
      title: "Ru Digital",
      userId: req.session.passport.user,
      reclames:reclamaçoes
    });
  })
});

router.route("/cardapio").get(checkNotAuthenticated, async (req, res) => {
  await todosOscardpio((cardapio)=>{
    res.render("cardapio", {
      title: "Ru Digital",
      userId: req.session.passport.user,
      cardapios:cardapio
    });
  })
});

router
  .route("/admin")
  .get(checkNotAuthenticated, (req, res) => {
    res.render("admin", { userId: req.session.passport.user, title: "Admin" });
  })
  .post(checkNotAuthenticated, async (req, res) => {
    try {
      await postCadapio(req, () => {
        res.redirect("/admin");
      });
    } catch (err) {
      res.render("admin", {
        inform: err,
        title: "Admin",
        userId: req.session.passport.user,
      });
    }
  });

router.get("/api", async (req, res) => {
  const resolut = await todosOscardpio((doc) => doc);
  res.send(JSON.stringify(resolut));
});

router
  .route("/login")
  .get(checkAuthenticated, (req, res) => {
    res.render("login", { userId: null, title: "Login" });
  })
  //LOG IN
  .post(
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "login",
      failureFlash: true,
    })
  );

//PADENA DE CARDASTRO
router
  .route("/signup")
  .get(checkAuthenticated, (req, res) => {
    res.render("register", { title: "Sign Up" });
  })
  //crir uma conta
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
      res.render("register", {
        inform: err,
        title: "Crio conta",
      });
    }
  });

//crio reclama aqui
router.route("/reclamaaqui").post(async (req, res) => {
  await crioReclamaAqui(req, res);
});

//crio feedback
router.route("/feedback").post(async (req, res) => {
  await crioFeedback(req, res);
});

//login
router.get("/logout", checkNotAuthenticated, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

//EXPORTANDO Router MODULE
module.exports = router;
