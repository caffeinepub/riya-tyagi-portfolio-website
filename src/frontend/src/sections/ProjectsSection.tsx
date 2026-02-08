import { SectionLayout } from '@/components/SectionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Users } from 'lucide-react';

const projects = [
  {
    title: 'FMCG Sales & Marketing Analytics',
    icon: BarChart,
    description: 'Comprehensive analysis of sales performance and marketing ROI for a leading FMCG company.',
    highlights: [
      'Sales performance and marketing ROI analysis',
      'Data cleaning, aggregation, and trend analysis',
      'Business-driven insights for strategy optimization',
    ],
    tools: ['SQL', 'Python'],
  },
  {
    title: 'Customer & Product Analytics',
    icon: Users,
    description: 'Deep-dive analysis into customer behavior and product performance metrics.',
    highlights: [
      'Product performance and engagement analytics',
      'Identification of customer behavior patterns',
      'Retention drivers and churn analysis',
    ],
    tools: ['Python', 'SQL'],
  },
];

export function ProjectsSection() {
  return (
    <SectionLayout
      id="projects"
      title="Featured Projects"
      subtitle="Real-world analytics solutions delivering business impact"
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <Card
              key={index}
              className="premium-card group shadow-soft hover:shadow-soft-lg"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {project.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex gap-2">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span className="flex-1">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tools.map((tool, tIndex) => (
                    <Badge key={tIndex} variant="outline" className="border-2">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionLayout>
  );
}
