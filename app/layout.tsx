import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";
import {Toaster} from "react-hot-toast"
import QueryClientProvider from "@/providers/QueryClientProvider";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <Theme appearance="light" accentColor="violet">
            <NavBar />
            <main className="main p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </QueryClientProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
