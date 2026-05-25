import type { Metadata } from "next";
import "./globals.css";
import MobileStickyFooter from "./components/MobileStickyFooter";

export const metadata: Metadata = {
  title: "Akotro",
  description: "Eco-friendly pencils and pens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-full flex flex-col antialiased pb-20 md:pb-0">
        {children}
        <MobileStickyFooter />
      </body>
    </html>
  );
}

