import prisma from "@/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [Github],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth?.user);
      
      // const isLoggedIn = !!auth?.user;
      // const paths = ["/issues"];
      // const isProtected = paths.some((path) =>
      //   nextUrl.pathname.startsWith(path)
      // );
      // if (isProtected && !isLoggedIn) {
      //   const redirectUrl = new URL("/api/auth/signin", nextUrl.origin);
      //   redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
      //   return Response.redirect(redirectUrl);
      // }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
