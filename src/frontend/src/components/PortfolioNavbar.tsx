import { useState, useEffect } from 'react';
import { Menu, X, Mail, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
];

interface PortfolioNavbarProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

export function PortfolioNavbar({ navigate, currentPath = '/' }: PortfolioNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isMessagesPage = currentPath === '/messages';
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (!isMessagesPage) {
        // Update active section based on scroll position
        const sections = [...navLinks, { id: 'contact', label: 'Contact' }].map(link => document.getElementById(link.id));
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection([...navLinks, { id: 'contact', label: 'Contact' }][i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMessagesPage]);

  const scrollToSection = (id: string) => {
    if (navigate && currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
    setIsOpen(false);
  };

  const handleNavigateToMessages = () => {
    if (navigate) {
      navigate('/messages');
    }
    setIsOpen(false);
  };

  const handleNavigateHome = () => {
    if (navigate) {
      navigate('/');
    } else {
      scrollToSection('home');
    }
  };

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-soft border-b' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={handleNavigateHome}
            className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Riya Tyagi
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {!isMessagesPage && navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {isMessagesPage ? (
              <Button
                onClick={handleNavigateHome}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                Back to Portfolio
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="ml-4 shadow-soft-lg hover:shadow-xl transition-shadow gradient-accent text-white hover:opacity-90"
                  size="default"
                >
                  Contact Me
                </Button>
                <Button
                  onClick={handleNavigateToMessages}
                  variant="outline"
                  size="default"
                  className="ml-2"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </>
            )}
            
            {/* Desktop Auth Button */}
            <Button
              onClick={handleAuth}
              disabled={isLoggingIn}
              variant={isAuthenticated ? "outline" : "default"}
              size="default"
              className={`ml-2 ${!isAuthenticated ? 'bg-secondary hover:bg-secondary/90' : ''}`}
            >
              {isLoggingIn ? (
                'Logging in...'
              ) : isAuthenticated ? (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {!isMessagesPage && navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-lg text-left text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              {isMessagesPage ? (
                <Button
                  onClick={handleNavigateHome}
                  variant="outline"
                  className="mt-2"
                >
                  Back to Portfolio
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => scrollToSection('contact')}
                    className="mt-2 gradient-accent text-white hover:opacity-90"
                    size="default"
                  >
                    Contact Me
                  </Button>
                  <Button
                    onClick={handleNavigateToMessages}
                    variant="outline"
                    size="default"
                    className="mt-2"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </>
              )}
              
              {/* Mobile Auth Button */}
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? "outline" : "default"}
                size="default"
                className={`mt-2 ${!isAuthenticated ? 'bg-secondary hover:bg-secondary/90' : ''}`}
              >
                {isLoggingIn ? (
                  'Logging in...'
                ) : isAuthenticated ? (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
