import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "h-max bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="hidden h-full w-full lg:block">{children}</div>
        <div className="flex h-full min-h-screen w-full items-center justify-center lg:hidden">
          Mobile support coming soon
        </div>
      </body>
    </html>
  );
}
