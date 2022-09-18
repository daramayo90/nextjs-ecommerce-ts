import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

export const authOptions: NextAuthOptions = {
   providers: [
      // Custom Login
      Credentials({
         name: 'Custom Login',
         credentials: {
            email: { label: 'Mail:', type: 'email', placeholder: 'youremail@gmail.com' },
            password: { label: 'Password:', type: 'password', placeholder: 'Password' },
         },
         async authorize(credentials) {
            console.log({ credentials });
            return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
         },
      }),
      // Github Login
      GithubProvider({
         clientId: process.env.GITHUB_ID!,
         clientSecret: process.env.GITHUB_SECRET!,
      }),
      // ...add more providers here
      // TODO: Agregar más providers
   ],

   // Custom Pages
   pages: {
      signIn: '/auth/login',
      newUser: '/auth/register',
   },

   session: {
      maxAge: 2592000, // 30 days
      strategy: 'jwt',
      updateAge: 86400, // every day
   },

   // Callbacks
   callbacks: {
      async jwt({ token, account, user }) {
         if (account) {
            token.accessToken = account.access_token;
            switch (account.type) {
               case 'oauth':
                  token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
                  break;

               case 'credentials':
                  token.user = user;
                  break;
            }
         }
         return token;
      },
      async session({ session, token, user }) {
         session.accessToken = token.access_token;
         session.user = token.user as any;
         return session;
      },
   },
};

export default NextAuth(authOptions);
