import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Construction Portfolio | Trackify Studio",
  description: "Modern construction portfolio with 3D hero, services, projects, testimonials, and contact."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-night text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

