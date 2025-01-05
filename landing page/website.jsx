import Faq from "../components/Landing Page Components/Faq";
import Features from "../components/Landing Page Components/Features";
import Footer from "../components/Landing Page Components/Footer";
import Hero from "../components/Landing Page Components/Hero";
import MidCta from "../components/Landing Page Components/MidCta";
import Pricing from "../components/Landing Page Components/Pricing";
import { Wobble } from "../components/Landing Page Components/Wobble";

const Website = () => {
  return (
    <div className="transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <Hero />

      <div id="features">
        <Features />
      </div>

      <MidCta />

      <Wobble />

      <div id="pricing">
        <Pricing />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Website;
