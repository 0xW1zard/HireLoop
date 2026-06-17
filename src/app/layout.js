import { Manrope } from "next/font/google";
import "./globals.css";
import HireloopNavbar from "@/components/HireloopNavbar";
import Footer from "@/components/Footer";
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
      <body className={`${manrope.className} min-h-full flex flex-col text-zinc-200 `}>
        <AppToaster />
        <HireloopNavbar />
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}