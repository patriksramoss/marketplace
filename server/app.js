require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const RedisStore = require("connect-redis").default; // Use `.default` to get the function
const redisClient = require("./helpers/redisClient"); // Import your Redis client
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const moment = require("moment");
const cors = require("cors"); // Import the cors middleware
const favicon = require("serve-favicon");
const authCheckFalse = require("./helpers/authCheckFalse");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Database Connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  dbName: "marketplace",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Log a success message on successful connection
db.once("open", () => {
  console.log(
    "MongoDB connected successfully on Port: " +
      process.env.PORT +
      " @ http://localhost:" +
      process.env.PORT +
      " !"
  );
});

const indexRouter = require("./routes/index");
const mainRouter = require("./routes/main");
const paymentRouter = require("./routes/payment");
const User = require("./models/user");

const app = express();

app.use(
  cors({
    origin: process.env.API_BASE_CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.locals.moment = moment;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            // Other fields if needed
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize and deserialize user to support persistent login sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// const sessionStore = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   collection: "user-sessions",
//   databaseName: "marketplace",
// });
// sessionStore.on(
//   "error",
//   console.error.bind(console, "MongoDB Session Storage connection error")
// );

app.use(
  session({
    name: "session-id",
    // store: sessionStore,
    store: new RedisStore({ client: redisClient }), // Use RedisStore
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      //WORKING PROD AND DEV !!!
      sameSite: process.env.NODE_ENV.trim() === "production" ? true : false,
      // secure: process.env.NODE_ENV.trim() === "production" ? true : false,
      domain: process.env.API_BASE,
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// -------------- End Passport --------------------- //

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../client/dist")));

// Get access to currentUser variable in all views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);
app.use("/api/main", authCheckFalse, mainRouter);
app.use("/is-auth", indexRouter);
app.use("/payment", paymentRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
