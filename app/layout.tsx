import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <div className="max-w-7xl mx-auto z-100 bg-white/90">
          <Navbar />
          <div className="mt-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
