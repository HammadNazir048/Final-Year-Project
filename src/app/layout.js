import { Inter } from "next/font/google";
import "./globals.css";
import { dbConnent } from "@/lib/mongo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Script Scout",
  description: "Script Scout Web",
};

export default async function RootLayout({ children }) {
  const conn = await dbConnent();
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
