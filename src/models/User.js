import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	// username and password are handled automatically by passport local mongoose
	verified: {type: Boolean, default: false},
	hasPassword: {type: Boolean, default: true},
	googleId: String,
	googleToken: String,
	githubId: String,
	githubToken: String

});

userSchema.plugin(passportLocalMongoose);
export default mongoose.model('User', userSchema);
