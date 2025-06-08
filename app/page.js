import Hero from "@components/Hero/page";
import Works from "@components/Works/page";
import Testimonials from "@components/Testimonials/page";
import FAQs from "@components/FAQ/page";
import Pricing from "@components/Pricing/page";
import Footer from "@components/Footer/page";

const Home = () => {
  return (
    <div>
      <Works />
      <Testimonials />
      <Pricing />
      <FAQs />
      <Footer />
    </div>
  );
};

export default Home;
