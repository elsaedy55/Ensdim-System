import { Button } from './Button';
import { ExternalLink } from 'lucide-react';

export function ProductsSection() {
  const products = [
    {
      name: 'Healthcare Management System',
      problem: 'Clinics losing patient data and appointment chaos',
      modules: ['Patient CRM', 'Appointment Booking', 'Medical Records', 'WhatsApp Integration', 'Payment Tracking'],
      status: 'Live',
      image: 'gradient-1'
    },
    {
      name: 'Real Estate Lead Engine',
      problem: 'Property leads lost between ads and WhatsApp',
      modules: ['Lead Capture', 'Property Matching', 'Follow-up Automation', 'Client Portal', 'Analytics Dashboard'],
      status: 'Live',
      image: 'gradient-2'
    },
    {
      name: 'Service Business OS',
      problem: 'Manual operations causing service delays',
      modules: ['Order Management', 'Team Coordination', 'Customer Tracking', 'Invoice Generation', 'Performance Metrics'],
      status: 'Live',
      image: 'gradient-3'
    }
  ];

  const gradients = {
    'gradient-1': 'from-[#6D5DF6] to-[#3B2A78]',
    'gradient-2': 'from-[#3B2A78] to-[#6D5DF6]',
    'gradient-3': 'from-[#6D5DF6] via-[#3B2A78] to-[#6D5DF6]'
  };

  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-4">
            Products & Systems We Built
          </h2>
          <p className="text-base sm:text-xl text-[#4F555E] max-w-3xl mx-auto">
            Real systems solving real business problems. Not demos, not templates — production-ready solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#6D5DF6] hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Dashboard Thumbnail */}
              <div className={`h-48 bg-gradient-to-br ${gradients[product.image as keyof typeof gradients]} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 p-4 w-full">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-16 bg-white/20 backdrop-blur-sm rounded-lg"></div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#6D5DF6] text-white text-xs font-semibold rounded-full">
                    {product.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#101418] mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-[#4F555E] mb-4">
                  <span className="font-semibold">Problem Solved:</span> {product.problem}
                </p>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-[#4F555E] mb-2">MAIN MODULES</p>
                  <div className="flex flex-wrap gap-2">
                    {product.modules.map((module, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#EEEAFE] border border-[#E5E5E5] text-xs text-[#101418] rounded"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    View Product
                    <ExternalLink size={16} />
                  </Button>
                  <Button variant="primary" className="w-full">
                    Request Similar System
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
