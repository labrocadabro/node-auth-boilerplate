import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

import Token from '../models/Token.js';

dotenv.config();

const transport = nodemailer.createTransport({
	// test server using Mailhog
	host: "0.0.0.0",
	port: 1025
	// host: process.env.SMTP_SERVER,
  // port: process.env.SMTP_PORT,
  // secure: true,
  // auth: {
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASS,
	// }
});

export const verify = async (req, res) => {
	if (!req.user.verified) {
		const token = crypto.randomBytes(32).toString('hex');
		await new Token({token, email: req.user.username}).save();
		await sendVerification(token, req.user.username);
	}
	res.redirect(req.session.returnTo || '/dashboard');
};

export const sendVerification = async (token, email) => {
	const url = `${process.env.DOMAIN}/verify?token=${token}`;
	await transport.sendMail({
		from: process.env.FROM_EMAIL,
		to: email,
		subject: "Please verify your account",
		text: `Please copy and paste this link into your browser: ${url}`,
		html: `<h3>Verify your account</h3><p>Please click <a href="${url}">this link</a> to verify your account</p>` 
	})
}