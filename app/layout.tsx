import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "./Loading";
import { Suspense } from "react";
// import Head from "next/head";

const sen = Sen({ 
  subsets: ["latin"],
  weight: ["400","500", "600", "700", "800"],

});

export const metadata: Metadata = {
  title: "Code with Karchies",
  description: "Created by Nkachukwu Nwobi",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      {/* <Head>
        <link rel="icon" href="/blog_icon.png" />
        <title>Nkachukwu's Blog</title>
        <meta name="description" content="Created by Nkachukwu Nwobi" />
      </Head> */}
      <body className={sen.className}>
        <div className={`mx-auto z-100 my-0 py-0 ${sen.className}`}>
          <Suspense fallback={<Loading />}>
            <Navbar />
            <div className=" h-full">{children}</div>
            <Footer />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
