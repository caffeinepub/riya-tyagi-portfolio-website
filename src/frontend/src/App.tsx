import { useEffect, useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { ContactSection } from './sections/ContactSection';
import { PortfolioNavbar } from './components/PortfolioNavbar';
import { Footer } from './components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { MessagesPage } from './pages/MessagesPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPath === '/messages') {
    return (
      <div className="min-h-screen bg-background">
        <PortfolioNavbar navigate={navigate} currentPath={currentPath} />
        <main className="relative pt-20">
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] hero-gradient-shape rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] hero-gradient-shape rounded-full blur-3xl opacity-50" />
          </div>
          <MessagesPage />
        </main>
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PortfolioNavbar navigate={navigate} currentPath={currentPath} />
      <main className="relative">
        {/* Layered background elements with gradient accents */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] hero-gradient-shape rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] hero-gradient-shape rounded-full blur-3xl opacity-50" />
        </div>
        
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
