import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

// Custom Files
import { initializingPassport } from "./Config/passportConfig.js";
import { user_Model } from "./db.js";
import connect from "./db.js";

const app = express();
// Passport middleware setup
connect()
initializingPassport(passport);


app.use(express.json())
app.use(express.urlencoded({extended:true}))
// express-session setup
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "abc",
    store:MongoStore.create({
      mongoUrl:"mongodb://127.0.0.1/27017",
      dbName:"passport",
      collectionName:"Session"

    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");


// Get Routes
app.get("/", (req, res) => {
  console.log(req.sessionID);

  if (req.session.views) {
    req.session.views = req.session.views + 1;
  } else {
    req.session.views = 1;
  }

  res.send("VIEWS : " + req.session.views);
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/success", (req, res) => {
  res.render("success");
});

// Post Routes
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/success",
  }),
  async (req, res) => {}
);
app.post("/register", async (req, res) => {
  const {username, password } = req.body;

  // Creating a database entry
  await user_Model.create({
    username: username,
    password: password,
  });

  res.json({
    message: "User SuccessFully registered",
  });
});

app.listen(3000, () => {
  console.log("server running");
});
