require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const bodyparser = require("body-parser");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const expressLayout = require("express-ejs-layouts");

const { initPassport } = require("./auth/passport-config");

initPassport(passport);

const port = process.env.PORT || 5500;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(flash());

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

mongoose.connect(
  process.env.MONGO,
  {
    useNewUrlParser: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(`can not connect to DB ${err}`);
    } else {
      console.log("connected to mongo..");
    }
  }
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: mongoose.connection._connectionString,
      ttl: 10 * 60,
    }),

    //cookie:({ maxAge: 2 * 60})
  })
);
app.use(passport.initialize());

const userRouter = require("./routes/user");
const usarioAdmin = require("./routes/admin");

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
