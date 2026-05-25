import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductShowcaseSection from './components/ProductShowcaseSection';
import Features from './components/Features';
import MissionSection from './components/MissionSection';
import StatsSection from './components/StatsSection';
import TeamSection from './components/TeamSection';
import ReviewsSection from './components/ReviewsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
      <ProductShowcaseSection />
      <MissionSection />
      <StatsSection />
      <TeamSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
