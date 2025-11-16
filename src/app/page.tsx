import { Features } from "@site/components/Features";
import { Footer } from "@site/components/Footer";
import { Hero } from "@site/components/Hero";
import { Navbar } from "@site/components/Navbar";
import { PropertyForm } from "@site/components/PropertyForm";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PropertyForm />
      <Features />
      <Footer />
    </main>
  );
}
