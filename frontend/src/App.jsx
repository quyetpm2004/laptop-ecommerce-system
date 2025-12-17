import Header from "./components/client/layout/Header";
import HeroSection from "./components/client/HeroSection";
import FeaturesSection from "./components/client/FeaturesSection";
import FeaturedProductsSection from "./components/client/FeaturedProductsSection";
import Footer from "./components/client/layout/Footer";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedProductsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
