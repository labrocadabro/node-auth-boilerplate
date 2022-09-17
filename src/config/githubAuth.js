import {Strategy as GithubStrategy } from 'passport-github2';
import dotenv from 'dotenv';

import User from "../models/User.js";

dotenv.config();

const github = new GithubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `${process.env.DOMAIN}/oauth/github/callback`,
  },
	async function(accessToken, refreshToken, profile, cb) {
		console.log(profile)
		let user = await User.findOne( { githubId: profile.id });
		if (!user) {
			user = await User.findOne( { username: profile.emails[0].value });
			if (user) {
				user.githubId = profile.id;
			} else {
				user = new User({ 
					username: profile.emails[0].value, 
					githubId: profile.id, 
					verified: true
				});
			}
			await user.save();
		}
		return cb(null, user);
	}
);

export default github;