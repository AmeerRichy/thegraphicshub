import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"], variable: "--font-greatvibes" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Graphics Hub",
  description: "You dream it, we design it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${greatVibes.variable} ${poppins.variable} antialiased`}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        {children}
      </body>
    </html>
  );
}
