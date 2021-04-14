'use strict';
import env from 'dotenv';
env.config();
import {ApolloServer} from 'apollo-server-express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import mongoDB from './db/mongoDB.js';
import production from  './ssl/production.js';
import localhost from './ssl/localhost.js'
import {verifyAuth} from './auth/auth.js';




(async () => {
   try {
      const server = new ApolloServer({
         typeDefs: schemas,
         resolvers,
         context: async ({req, res}) => {
            const user = await verifyAuth(req, res);
            return {req, res, user};
         },
      });
   
       const app = express();
   
       server.applyMiddleware({app});
   
       mongoDB.on('connected', () => {
         process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    if (process.env.NODE_ENV === 'production') {
      console.log('prduction');
      production(app, process.env.PORT);
    } else {
      console.log('localhost');
      localhost(app, process.env.HTTPS_PORT,process.env.PORT );
    }
       })
   } catch (e) {
      console.log('server error: ', e);
   }
})();