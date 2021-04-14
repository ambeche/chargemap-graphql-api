"use strict";

import { AuthenticationError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import {login} from "../auth/auth.js";
import User from "../models/user.js";

export default {
  Query: {
    user: async (parent, args, { user }) => {
      console.log("userResolver", user);
      if (user) {
        const userInDB = await User.findById(user._id);
        delete userInDB.password;
        console.log("withoutPass", userInDB);
        return userInDB;
      }
      throw new AuthenticationError("not authorized or invalid credentials");
    },
    login: async (parent, args, { req, res }) => {
      // injecting username and password to req.body for passport
      console.log(args);
      req.body = args;
      console.log('req', req.body);
      try {
        const auth = await login(req, res);
        console.log("auth", auth);
        return {
          id: auth.user._id,
          username: auth.user.username,
          fullName: auth.user.fullName,
          token: auth.token,
        };
      } catch (e) {
        console.error('error', e);
        throw new AuthenticationError("invalid credentials");
      }
    },
  },

  Mutation: {
    registerUser: async (parent, args) => {
      try {
        const passHash = await bcrypt.hash(args.password, 12);
        const userWithHash = {
          ...args,
          password: passHash,
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        return result;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
