'use strict';
import passport from 'passport';
import {Strategy} from 'passport-local';
import passportJWT from "passport-jwt";
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import env from 'dotenv';

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;
env.config();


// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
  
      try {
        const user = await User.findOne({username});
        console.log('Local strategy', user);
        if (user === null ) {
          return done(null, false, {message: 'invalid credentials'});
        }

        const validateUser = await bcrypt.compare(password, user.password);

        if (!validateUser) {
          return done(null, false, {message: 'invalid credentials!'});
        }

        const userWithoutPass = user.toObject()
        delete userWithoutPass.password // delete user's password for security

        return done(null, userWithoutPass, {message: 'Logged In Successfully'}); 
      } catch (err) {
        return done(err);
      }
    }));

// JWT strategy for handling bearer token

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.SECRET
},
 async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id);
    console.log('jwt strategy', jwtPayload);
    if (user === null) {
      return done(null, false);
    }
    delete user.password
    return done(null, user); 
  } catch (err) {
    return done(err);
  }
}
));


export default passport;