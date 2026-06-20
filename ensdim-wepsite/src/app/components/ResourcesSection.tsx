import { FileText, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export function ResourcesSection() {
  const resources = [
    {
      icon: FileText,
      title: 'Research',
      description: 'Industry insights, operational analysis, and technology trends for Gulf businesses',
      count: '12 Papers',
      color: 'from-[#6D5DF6] to-[#3B2A78]'
    },
    {
      icon: BarChart3,
      title: 'Case Studies',
      description: 'Real implementation stories showing how we solved complex business challenges',
      count: '8 Cases',
      color: 'from-[#3B2A78] to-[#6D5DF6]'
    },
    {
      icon: BookOpen,
      title: 'Blog',
      description: 'Practical guides on automation, CRM, AI integration, and digital transformation',
      count: '24 Articles',
      color: 'from-[#6D5DF6] to-[#8B7BF7]'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-4">
            Thinking beyond software
          </h2>
          <p className="text-base sm:text-xl text-[#4F555E] max-w-3xl mx-auto">
            Learn from our research, case studies, and insights on building intelligent business systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-[#E5E5E5] hover:border-[#6D5DF6] hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${resource.color} rounded-2xl flex items-center justify-center mb-6`}>
                <resource.icon className="text-white" size={32} />
              </div>

              <div className="mb-2">
                <span className="text-sm font-bold text-[#6D5DF6]">
                  {resource.count}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#101418] mb-3">
                {resource.title}
              </h3>

              <p className="text-[#4F555E] mb-6 leading-relaxed">
                {resource.description}
              </p>

              <div className="flex items-center gap-2 text-[#6D5DF6] group-hover:gap-4 transition-all">
                <span className="text-sm font-semibold">Explore</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline">
            View All Resources
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
