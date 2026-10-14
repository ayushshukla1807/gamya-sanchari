import About from "@/components/About";
import Destinations from "@/components/Destinations";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Destinations />
      <Services />
      <WhyUs />
      <Testimonials />
    </main>
  );
}
