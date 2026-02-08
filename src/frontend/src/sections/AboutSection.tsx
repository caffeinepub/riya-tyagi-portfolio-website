import { SectionLayout } from '@/components/SectionLayout';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Briefcase, TrendingUp } from 'lucide-react';

export function AboutSection() {
  return (
    <SectionLayout
      id="about"
      title="About Me"
      subtitle="Passionate about turning data into actionable insights"
      className="bg-muted/30"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Professional Summary */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold">Professional Summary</h3>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>
                    I am a dedicated Data Analytics professional with over 3 years of industry experience specializing in forecasting, business intelligence, and advanced analytics. My expertise lies in transforming complex datasets into strategic insights that drive business decisions and operational efficiency.
                  </p>
                  <p>
                    Throughout my career, I have worked extensively with large-scale datasets, developing automated data pipelines and building predictive models that have achieved up to 95% forecast accuracy. I excel at collaborating with cross-functional teams, including IT, business stakeholders, and leadership, to deliver data-driven solutions that align with organizational goals.
                  </p>
                  <p>
                    My technical proficiency spans SQL, Python, Tableau, Power BI, and advanced Excel, enabling me to handle end-to-end analytics projects from data extraction and cleaning to visualization and stakeholder reporting.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold">Education</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold text-lg">M.Sc. in Data Science</h4>
                    <p className="text-muted-foreground">Amity University, Rajasthan</p>
                    <p className="text-sm text-muted-foreground">GPA: 9.58/10</p>
                  </div>
                  <div className="border-l-2 border-muted pl-4">
                    <h4 className="font-semibold text-lg">B.Sc. Mathematics (Hons.)</h4>
                    <p className="text-muted-foreground">University of Delhi</p>
                    <p className="text-sm text-muted-foreground">GPA: 8.22/10</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Transition */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold">Career Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I am actively seeking opportunities to advance into more strategic data science and analytics roles where I can leverage my technical expertise and business acumen to solve complex problems. My goal is to contribute to organizations that value data-driven decision-making and innovation, while continuing to expand my skills in machine learning, advanced statistical modeling, and AI-driven analytics solutions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionLayout>
  );
}
