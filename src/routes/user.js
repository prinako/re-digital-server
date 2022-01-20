const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  findUser,
  criaNovoUsario,
  postCadapio,
  updateProfile,
  findAllCadapios,
} = require("../databases/querys");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/passport-config");

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));

//RENDING LOG IN PAGE
router.route("/").get((req, res) => {
  res.redirect("login");
});

router
  .route("/admin")
  .get(checkNotAuthenticated, (req, res) => {
    res.render("admin", { userId: req.session.passport.user, title: "Admin" });
  })
  .post(
    checkNotAuthenticated,
    async (req, res) => {
      try {
       await postCadapio(req,() => {
          res.redirect("/api");
        });
      } catch (err) {
        res.render("admin", {
          inform: err,
          title: "Admin",
          userId: req.session.passport.user,
        });
      }
    }
  );

  router.get("/api", async (req, res) => {
    const resolut = await findAllCadapios((doc)=>doc);
  
    //await findAllProducts((products) => {
    //  for (let i = 0; i < datas.length; i++) {
    //console.log(resolut);
    //  }
    //});
    res.json(resolut);
  });

router
  .route("/login")
  .get(checkAuthenticated, (req, res) => {
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
  .get(checkAuthenticated, (req, res) => {
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

router.get("/logout", checkNotAuthenticated, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

//EXPORTING Router MODULE
module.exports = router;
