import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FitForge",
  description: "Book your class. Forge your week.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <header className="border-b border-forge-line">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Fit<span className="text-forge-ember">Forge</span>
            </Link>
            <nav className="flex gap-6 text-sm text-forge-mist">
              <Link href="/" className="hover:text-forge-chalk">Classes</Link>
              <Link href="/my-bookings" className="hover:text-forge-chalk">My Bookings</Link>
              <Link href="/staff/waitlists" className="hover:text-forge-chalk">Staff</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
