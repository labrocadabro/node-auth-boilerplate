import express from "express";
import path from 'path';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import * as url from 'url';

import connectDB from "./config/db.js";
import mainRouter from "./routes/mainRouter.js";
import User from "./models/User.js";

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config();

const app = express();
const port = process.env.PORT;
console.log(port)

app.set('views', './src/views');
app.set('view engine', 'pug'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 * 24 } // 1 day
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRouter);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

connectDB();

app.listen(port, () => console.log(`Server is running on port ${port}`));