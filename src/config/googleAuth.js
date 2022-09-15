import {Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

import User from "../models/User.js";

dotenv.config();

const google = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.DOMAIN}/oauth/google/callback`
  },
	async function(accessToken, refreshToken, profile, cb) {
    const user = await User.findOneAndUpdate(
			{ username: profile.emails[0].value },
			{ googleId: profile.id, verified: profile.emails[0].verified },
			{ new: true, upsert: true }
		)
		return cb(null, user);
	}
);

export default google;