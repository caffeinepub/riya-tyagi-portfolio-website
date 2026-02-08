import { useState } from 'react';
import { SectionLayout } from '@/components/SectionLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import { useContactSubmit } from '@/hooks/useContactSubmit';
import { toast } from 'sonner';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'riyatyagi2017@gmail.com',
    href: 'mailto:riyatyagi2017@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-8433277127',
    href: 'tel:+918433277127',
  },
  {
    icon: SiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/riya-tyagi-865962202',
    href: 'https://linkedin.com/in/riya-tyagi-865962202',
  },
  {
    icon: SiGithub,
    label: 'GitHub',
    value: 'github.com/riyatyagi2017',
    href: 'https://github.com/riyatyagi2017',
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { submitMessage, isSubmitting, isReady } = useContactSubmit();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if actor is ready before attempting submission
    if (!isReady) {
      toast.error('Please wait', {
        description: 'The form is still loading. Please try again in a moment.',
      });
      return;
    }

    try {
      await submitMessage(formData.name, formData.email, formData.message);
      toast.success('Message received!', {
        description: "Your message has been saved. I'll review it and get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error: any) {
      // Display user-friendly error messages based on error type
      if (error?.message === 'ACTOR_NOT_READY') {
        toast.error('Please wait', {
          description: 'The form is still loading. Please try again in a moment.',
        });
      } else if (error?.message === 'NETWORK_ERROR') {
        toast.error('Connection issue', {
          description: 'Please check your internet connection and try again, or contact me directly at riyatyagi2017@gmail.com.',
        });
      } else if (error?.message === 'UNAUTHORIZED') {
        toast.error('Access denied', {
          description: 'Please contact me directly at riyatyagi2017@gmail.com.',
        });
      } else {
        toast.error('Failed to save message', {
          description: 'Something went wrong. Please try again or contact me directly at riyatyagi2017@gmail.com.',
        });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <SectionLayout
      id="contact"
      title="Get In Touch"
      subtitle="Let's discuss how I can help with your data analytics needs"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out through any of these channels. I'm always open to discussing new opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-4">
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <a
                    key={index}
                    href={detail.href}
                    target={detail.href.startsWith('http') ? '_blank' : undefined}
                    rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors group shadow-soft"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{detail.label}</div>
                      <div className="font-medium">{detail.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-accent text-white hover:opacity-90"
                  size="lg"
                  disabled={isSubmitting || !isReady}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : !isReady ? (
                    'Loading...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
                {!isReady && !isSubmitting && (
                  <p className="text-xs text-muted-foreground text-center">
                    Initializing form...
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionLayout>
  );
}
