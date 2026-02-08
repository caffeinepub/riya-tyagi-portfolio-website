import { SectionLayout } from '@/components/SectionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, BarChart3, PieChart, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming & Databases',
    icon: Code,
    skills: [
      'Python (Pandas, NumPy, Matplotlib)',
      'SQL',
      'MySQL',
      'NoSQL',
      'Jupyter Notebook',
      'Git',
    ],
  },
  {
    title: 'Data Analytics & Modeling',
    icon: BarChart3,
    skills: [
      'Forecasting',
      'Predictive Modeling',
      'Trend Analysis',
      'KPI Tracking',
      'Customer & Churn Analytics',
    ],
  },
  {
    title: 'Visualization & BI',
    icon: PieChart,
    skills: [
      'Tableau',
      'Power BI',
      'Advanced Excel',
      'Dashboards',
      'Heatmaps',
      'Cohort Analysis',
    ],
  },
  {
    title: 'Tools & Practices',
    icon: Wrench,
    skills: [
      'Data Pipeline Automation',
      'Data Warehousing',
      'Schema Design & Indexing',
      'Stakeholder Reporting',
      'Technical Documentation',
    ],
  },
];

export function SkillsSection() {
  return (
    <SectionLayout
      id="skills"
      title="Skills & Expertise"
      subtitle="Technical proficiencies and analytical capabilities"
    >
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className="premium-card group shadow-soft hover:shadow-soft-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-sm px-3 py-1.5">
                      {skill}
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
