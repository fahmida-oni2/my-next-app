import { getDb } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {

          const db = await getDb();
          

          const user = await db.collection("users").findOne({ email: credentials.email });

          if (!user) {
            return null; 
          }

          if (user.password !== credentials.password) {
            return null; 
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image_url,
          };
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };