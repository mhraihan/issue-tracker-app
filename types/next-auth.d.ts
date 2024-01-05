import NexAuth, { DefaultSession } from "next-auth";
/**
 * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}