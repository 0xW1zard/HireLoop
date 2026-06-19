import Footer from "@/components/Footer";
import HireloopNavbar from "@/components/HireloopNavbar";

export default function MainLayout({ children }) {
  return (
    <>
      <HireloopNavbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}