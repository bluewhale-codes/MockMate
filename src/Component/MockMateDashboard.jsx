import Navbar from './Navbar';
import HeroSection from './HeroSection';
import UploadTestCard from './UploadTestCard';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';


export default function MockMateDashboard() {




  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Navbar />
        <HeroSection />
        <UploadTestCard />
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}
