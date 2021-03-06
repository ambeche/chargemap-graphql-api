'use strict';
import env from 'dotenv';
env.config();
import {ApolloServer} from 'apollo-server-express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import mongoDB from './db/mongoDB.js';



(async () => {
   try {
      const server = new ApolloServer({
         typeDefs: schemas,
         resolvers,
      });
   
       const app = express();
   
       server.applyMiddleware({app});
   
       mongoDB.on('connected', () => {
         app.listen(process.env.PORT, () =>
         console.log(
             `🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
     );
       })
   } catch (e) {
      console.log('server error: ', e);
   }
})();