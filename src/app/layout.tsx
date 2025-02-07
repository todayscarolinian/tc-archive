import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "Digital Archives - Today's Carolinian",
  description: "A digital archive for all articles of Today's Carolinian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.variable} bg-[#F8F8F8]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
