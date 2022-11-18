import express from "express";
import path from "path";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import * as url from "url";

import connectDB from "./db/config.js";
import google from "./auth/oauth/integrations/google.js";
import github from "./auth/oauth/integrations/github.js";

import User from "./users/User.model.js";

import auth from "./auth/middleware.js";
import flash from "./flash/middleware.js";

import mainRouter from "./main/routes.js";
import emailRouter from "./email/routes.js";
import oauthRouter from "./auth/oauth/routes.js";

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 * 24 }, // 1 day
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.use(google);
passport.use(github);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(auth);
app.use(flash);

app.use("/", mainRouter);
app.use("/email", emailRouter);
app.use("/oauth", oauthRouter);
app.use((req, res, next) => {
  res.status(404).render("404");
});

connectDB();

app.listen(port, () => console.log(`Server is running on port ${port}`));
