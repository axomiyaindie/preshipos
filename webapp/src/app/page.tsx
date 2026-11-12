import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Journey } from "@/components/home/journey";
import { About } from "@/components/home/about";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Journey />
        <About />
      </main>
      <Footer />
    </>
  );
}