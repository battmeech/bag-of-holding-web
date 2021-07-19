import { ApolloServer } from '@saeris/apollo-server-vercel';
import mongoose from 'mongoose';
import { logger } from 'shared';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const createApolloServer = () => {
  mongoose
    .connect(process.env.DATABASE_CONNECTION_STRING ?? '', {
      auth: {
        user: process.env.DATABASE_USER ?? '',
        password: process.env.DATABASE_PASSWORD ?? '',
      },
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      logger.info('Connected to database');
    });

  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
};
