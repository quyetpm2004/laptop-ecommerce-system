import Header from "./components/layout/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import Footer from "./components/layout/Footer";
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
