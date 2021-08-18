import { graphUrl } from "api/config";
import { request } from "graphql-request";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { Login, LoginGQL, LoginVariables } from "./gql";

export const auth = NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Fetch the ID of the user from the database and attach to the JWT
    jwt: async (token, user, account) => {
      if (!user || !account) return token;

      const res = await request<Login, LoginVariables>(graphUrl, LoginGQL, {
        externalId: `${account.provider}-${(user.id as any).toString()}`,
      });
      token.userId = res.login.id;
      return token;
    },
    // Expose the user ID in the next-auth session
    session: async (session, token) => {
      session.userId = token.userId;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});