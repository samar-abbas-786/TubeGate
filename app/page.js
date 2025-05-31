import Hero from "@components/Hero/page";
import Works from "@components/Works/page";
import Testimonials from "@components/Testimonials/page";
import FAQs from "@components/FAQ/page";
import Pricing from "@components/Pricing/page";

const Home = () => {
  return (
    <div>
      <Hero />
      <Works />
      <Testimonials />
      <Pricing />
      <FAQs />
    </div>
  );
};

export default Home;
