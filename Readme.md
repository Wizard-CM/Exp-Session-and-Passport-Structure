import express from "express";
import session from "express-session";
import connect from "./db.js";
const app = express();
connect()

// Express Session Middleware Setup
app.use(session({
  secret: 'your-secret-key',    // A secret key to sign the session ID cookie
  resave: false,                // Forces the session to be saved back to the session store
  saveUninitialized: true,      // Forces a session that is "uninitialized" to be saved to the store
  // cookie: {
  //   maxAge: 60000,              // Session cookie expires after 60 seconds
  //   secure: false,              // Set to true if your app is served over HTTPS
  //   httpOnly: true              // Reduces the risk of XSS attacks by preventing the client-side access to the cookie
  // }
}));

// Example Route
app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.send(`Views: ${req.session.views}`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});