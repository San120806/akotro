import Header from '../components/Header';
import AboutHeroSection from '../components/AboutHeroSection';
import ThreeRSection from '../components/ThreeRSection';
import StorySection from '../components/StorySection';
import MeetTheTeamSection from '../components/MeetTheTeamSection';
import OurPillarsSection from '../components/OurPillarsSection';
import CoreValuesSection from '../components/CoreValuesSection';
import JoinUsSection from '../components/JoinUsSection';
import JoinTheClubSection from '../components/JoinTheClubSection';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Header />
      <AboutHeroSection />
      <ThreeRSection />
      <StorySection />
      <MeetTheTeamSection />
      <OurPillarsSection />
      <CoreValuesSection />
      <JoinUsSection />
      <JoinTheClubSection />
      <Footer />
    </div>
  );
}
