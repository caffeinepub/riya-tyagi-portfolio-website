import { SectionLayout } from '@/components/SectionLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

export function CertificationsSection() {
  return (
    <SectionLayout
      id="certifications"
      title="Certifications"
      subtitle="Continuous learning and professional development"
      className="bg-muted/30"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="premium-card group shadow-soft hover:shadow-soft-lg">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">
                  Data Science with Generative AI
                </h3>
                <p className="text-muted-foreground">PW Skills • 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionLayout>
  );
}
