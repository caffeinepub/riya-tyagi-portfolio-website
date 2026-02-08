import { ArrowRight, Download, Mail, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCountUpOnView } from '@/hooks/useCountUpOnView';

const metrics = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 95, suffix: '%', label: 'Forecast Accuracy' },
  { value: 10, suffix: '+', label: 'Tools Mastered' },
  { value: 15, suffix: '+', label: 'Projects Completed' },
];

const skillsStrip = [
  'Python',
  'SQL',
  'Tableau',
  'Power BI',
  'Forecasting',
  'Data Visualization',
  'Predictive Modeling',
  'MySQL',
];

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const resumePath = '/assets/resume/riya-tyagi-resume.pdf';
    
    // Create a temporary anchor element for robust cross-browser download
    const link = document.createElement('a');
    link.href = resumePath;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = 'Riya_Tyagi_Resume.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Layered Decorative Backgrounds with Gradient Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient shape top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] hero-gradient-shape rounded-full blur-3xl opacity-40" />
        
        {/* Gradient shape bottom-left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] hero-gradient-shape rounded-full blur-3xl opacity-30" />
        
        {/* Dot Grid Pattern */}
        <div
          className="absolute top-0 right-0 w-full h-full opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: 'url(/assets/generated/hero-dot-grid.dim_1600x900.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'top right',
          }}
        />
        
        {/* Angular Shape Accent */}
        <div
          className="absolute bottom-0 right-0 w-[800px] h-[600px] opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage: 'url(/assets/generated/hero-angle-shape.dim_1200x900.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'bottom right',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Data Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'url(/assets/generated/hero-data-bg.dim_1920x900.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content Block */}
          <div className="space-y-8 lg:pr-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm px-4 py-2 shadow-soft">
                Data Analytics Professional
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Riya Tyagi
              </h1>
              <p className="text-2xl md:text-3xl text-foreground/90 font-semibold">
                Data Analytics & Data Science Professional
              </p>
              <p className="text-xl md:text-2xl font-medium bg-gradient-accent bg-clip-text text-transparent">
                Turning data into actionable insights
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Data Analytics professional with 3+ years of experience transforming complex datasets into actionable business insights. Specialized in SQL, Python, forecasting, and data visualization with a strong focus on automation and decision support.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="px-4 py-2.5 text-sm font-medium border-2">
                3+ Years Experience
              </Badge>
              <Badge variant="outline" className="px-4 py-2.5 text-sm font-medium border-2">
                95% Forecast Accuracy
              </Badge>
              <Badge variant="outline" className="px-4 py-2.5 text-sm font-medium border-2">
                SQL & Python Expert
              </Badge>
            </div>

            {/* CTA Buttons with Gradient */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="group shadow-soft-lg hover:shadow-xl transition-all text-base px-8 gradient-accent text-white hover:opacity-90"
              >
                View Portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleDownloadResume}
                className="shadow-soft hover:shadow-soft-lg transition-all text-base px-8 border-2"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection('contact')}
                className="shadow-soft hover:shadow-soft-lg transition-all text-base px-8"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </div>

            {/* Animated Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
          </div>

          {/* Right Profile Image Block with Floating Card */}
          <div className="flex justify-center lg:justify-end relative">
            {/* Decorative gradient blobs behind image */}
            <div className="absolute top-1/4 -right-8 w-72 h-72 hero-gradient-shape rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 -left-8 w-64 h-64 hero-gradient-shape rounded-full blur-3xl opacity-40" />
            
            <div className="relative">
              {/* Main profile image container */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src="/assets/Photo-1.jpg"
                  alt="Riya Tyagi - Data Analytics Professional"
                  className="w-full max-w-md h-auto object-cover"
                />
              </div>
              
              {/* Floating stat overlay card with gradient accent */}
              <Card className="absolute -bottom-6 -left-6 shadow-2xl border-2 bg-card/95 backdrop-blur-sm max-w-[200px] gradient-accent-subtle">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 gradient-accent rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">95%</div>
                      <div className="text-xs text-muted-foreground font-medium">Forecast Accuracy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Skills Trust Strip */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {skillsStrip.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium bg-secondary/50 hover:bg-secondary transition-colors shadow-soft"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, count } = useCountUpOnView(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
        {Math.round(count)}
        {suffix}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground font-medium mt-1">{label}</div>
    </div>
  );
}
