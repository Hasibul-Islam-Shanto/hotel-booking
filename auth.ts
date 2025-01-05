import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongodbClient from "@/lib/mongodbClient";
import connectMongo from "@/config/dbConnect";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { authConfig } from "./config/auth.config";

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
          const user = await User.findOne({ email: credentials.email });
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
    }),
  ],
});
