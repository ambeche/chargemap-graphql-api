'use strict';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import passport from './passport.js';

env.config();

const login = (req, res) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', {session: false},
        async (err, user, info) => {
          try {
            if (err || !user) {
              reject(err.message);
            }
            req.login(user, {session: false}, async (err) => {
              if (err) {
                reject(err);
              }
    
              const token = jwt.sign(user, process.env.SECRET); // jwt encoding
              resolve({user, token});
            });
          } catch (e) {
            reject({message: e.message});
          }
        })(req, res);
  });
};

const verifyAuth = (req, res) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        resolve(false);
      }
      resolve(user);
    })(req, res);
  });
};

export {
  login,
  verifyAuth,
};