import { Manrope } from "next/font/google";
import "./globals.css";
import { AppToaster } from "@/components/Toasts";

export const metadata = {
  title: "Hireloop | Find Your Dream Job Today",
  description: "The AI-native career platform. Built for people who take their work seriously.",
};

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`${manrope.variable} h-full antialiased`}>
      <body className={`${manrope.className} min-h-full flex flex-col bg-[#09090B] text-zinc-200`}>
        <AppToaster />
        {children}
      </body>
    </html>
  );
}