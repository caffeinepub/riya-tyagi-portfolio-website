import { SectionLayout } from '@/components/SectionLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Associate – Forecasting & Analytics',
    company: 'Sutherland Global Services',
    period: 'Jan 2023 – Present',
    current: true,
    achievements: [
      'Automated end-to-end data pipelines using Python & SQL, reducing manual effort by 50%',
      'Built standardized reporting frameworks for consistent business insights',
      'Delivered demand & volume forecasts with up to 95% accuracy',
      'Developed Tableau & Power BI dashboards for KPI tracking',
      'Worked closely with IT and business stakeholders to align analytics with strategic goals',
    ],
  },
  {
    title: 'Data Science Intern',
    company: 'Corizo',
    period: 'Jul 2022 – Aug 2022',
    current: false,
    achievements: [
      'Conducted CRM & sales data analysis to identify growth opportunities',
      'Performed data cleaning and exploratory data analysis (EDA) using Python',
      'Built predictive models for sales forecasting',
      'Presented insights via structured visualizations to stakeholders',
    ],
  },
];

export function ExperienceSection() {
  return (
    <SectionLayout
      id="experience"
      title="Professional Experience"
      subtitle="Building data-driven solutions across industries"
      className="bg-muted/30"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line - solid color */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-primary/30" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-8 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-soft" />

                <Card className="premium-card group shadow-soft hover:shadow-soft-lg">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xl font-semibold">{exp.title}</h3>
                            {exp.current && (
                              <Badge variant="default" className="text-xs shadow-soft">
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5 text-muted-foreground">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex gap-3">
                            <span className="text-primary mt-1.5 font-bold">•</span>
                            <span className="flex-1">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
