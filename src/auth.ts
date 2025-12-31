import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { TypeORMAdapter } from "@auth/typeorm-adapter";
import { connectionOptions, getDataSource } from "@/db/connect";
import { User } from "./entities";
import bcrypt from "bcryptjs";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing Github Oath credentials");
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: TypeORMAdapter(connectionOptions),
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const db = await getDataSource();
        const userRepo = db.getRepository(User);
        const user = await userRepo.findOne({
          where: { email: credentials.email as string },
        });
        if (!user || !user.password) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (passwordsMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
});
