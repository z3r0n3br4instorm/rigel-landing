import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InstallSection from "./components/InstallSection";
import StatusSection from "./components/StatusSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <InstallSection />
      <StatusSection />
      <Footer />
    </>
  );
}
