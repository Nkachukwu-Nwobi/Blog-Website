import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "./Loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nkachukwu's Blog",
  description: "Created by Nkachukwu Nwobi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto z-100 ">
          <Navbar />
          <div className="">
            <Suspense fallback={ <Loading/>}>
            {children}

            </Suspense>
            
          </div>
          <Footer />

        </div>
      </body>
    </html>
  );
}
