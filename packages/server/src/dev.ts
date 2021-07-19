import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { resolvers } from 'resolvers';
import { logger } from 'shared';
import { typeDefs } from 'typeDefs';

config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

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

const server = new ApolloServer({ schema });

server
  .listen({ port: process.env.PORT || 4000, cors: false })
  .then(({ url }) => {
    logger.info(`🚀  Server ready at ${url}`);
  });
