/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth, { User, Account, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongodbClient from "@/lib/mongodbClient";
import connectMongo from "@/config/dbConnect";
import UserModel from "@/model/userModel";
import bcrypt from "bcryptjs";
import { authConfig } from "./config/auth.config";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export async function refreshAccessToken(token: JWT) {
  try {
    if (!token?.refreshToken) {
      return token;
    }
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token?.refreshToken as string,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
      refreshToken: refreshedTokens?.refresh_token,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongodbClient, {
    databaseName: process.env.ENVIRONMENT,
  }),
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Invalid email or password");
          }
          await connectMongo();
          const user = await UserModel.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User already exist!");
          }
          const isPasswordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
          }
          return {
            id: user._id.toString() as string,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Something went wrong!");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: AdapterUser | User;
      account: Account | null;
    }) {
      if (account && user) {
        if (account.provider === "google") {
          return {
            accessToken: account?.access_token,
            accessTokenExpires:
              Date.now() +
              (typeof account?.expires_in === "number"
                ? account.expires_in * 1000
                : 0),
            refreshToken: account?.refresh_token,
            user,
          };
        }
        return { user };
      }

      if (Date.now() < Number(token?.accessTokenExpires)) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // @ts-ignore
      session.user = token?.user;
      // @ts-ignore
      session.accessToken = token?.access_token;
      // @ts-ignore
      session.error = token?.error;
      return session;
    },
  },
});
